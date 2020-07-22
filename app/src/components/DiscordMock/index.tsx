import React, { useMemo, useCallback, useState, useEffect } from "react";
import { AnyAction } from "redux";

import {
  DiscordMockDispatchContext,
  sendInvisibleMessage,
  sendMessage,
  react,
  unreact,
  clearMessages,
} from "@app/components/DiscordMock/actions";
import DiscordView from "@app/components/DiscordMock/DiscordView";
import {
  TransformMessageContext,
  transformMockMessage,
} from "@app/components/DiscordMock/transform";
import {
  createMockUser,
  IdProvisioner,
  Extension,
  makeMockUser,
} from "@app/components/DiscordMock/util";
import ErrorBoundary from "@app/components/ErrorBoundary";
import { useCurrentUser } from "@app/store/actions";
import { useDispatch, useSelector } from "@app/store/hooks";
import {
  interpretInvisible,
  interpretMessage,
  interpretReact,
  interpretUnreact,
  interpretLocalMessage,
  interpretLocalDelete,
  interpretClear,
} from "@app/store/slices/interpret";
import {
  addMissingUnit,
  formatDimension,
  randomInt,
  useMemoOnce,
  isDefined,
  useEffectOnce,
  useRefWrapper,
  isNil,
  architusUser,
  error,
} from "@app/utility";
import {
  MockUser,
  RawDimension,
  MockMessageSet,
  StyleObject,
  DiscordMockContext,
  DiscordMockCommands,
  TransformMessage,
  User,
} from "@app/utility/types";
import { Option } from "@architus/lib/option";

// Error display options
const ERROR_DISPLAY_DELAY = 4000;

/**
 * Builds an id to user map
 * @param users - List of users to build a map for
 */
function buildUserMap(...users: MockUser[]): Record<string, MockUser> {
  const userMap: Record<string, MockUser> = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });
  return userMap;
}

type DiscordMockProps = {
  height: RawDimension;
  channelName: string;
  messageSets: MockMessageSet[];
  loop?: boolean;
  offline?: boolean;
  allowedCommands?: string[];
  extensionCreator?: (
    context: DiscordMockContext,
    commands: DiscordMockCommands
  ) => Extension;
  style?: StyleObject;
  className?: string;
};

const DiscordMock: React.FC<DiscordMockProps> = ({
  channelName,
  messageSets,
  loop = true,
  offline = false,
  allowedCommands,
  height = 300,
  extensionCreator,
  style,
  className,
}) => {
  // Initialize discord mock context once
  const guildId = useMemoOnce(() => randomInt(10000000));
  const idProvisioner = useMemoOnce(() => new IdProvisioner());
  const user: Option<User> = useCurrentUser();
  const thisUser = useMemo(() => {
    if (user.isDefined()) return makeMockUser(user.get);
    return createMockUser(guildId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId, user.getOrElse(null)]);
  const users = useMemo(() => buildUserMap(thisUser, architusUser), [thisUser]);
  // Needed to remain stable if specified via literal
  const allowedCommandsSnapshot = useMemoOnce(() => allowedCommands);
  const context = useMemo(
    () => ({
      guildId,
      thisUser,
      users,
      architusUser,
      allowedCommands: allowedCommandsSnapshot,
    }),
    [guildId, thisUser, users, allowedCommandsSnapshot]
  );

  // Pull clumps from store
  const storeDispatch = useDispatch();
  const clumps = useSelector(
    (state) => state.interpret.messageClumps[guildId] || []
  );

  // Initialize the extension
  const commands: DiscordMockCommands = useMemo(
    () => ({
      sendMessage: (message: string, sender: MockUser): void => {
        storeDispatch(
          interpretLocalMessage({
            context,
            message,
            sender,
            id: idProvisioner.provision(),
          })
        );
      },
      deleteMessage: (id: number): void => {
        storeDispatch(interpretLocalDelete({ context, id }));
      },
    }),
    [context, storeDispatch, idProvisioner]
  );
  const extension = useMemo(
    () =>
      isDefined(extensionCreator) ? extensionCreator(context, commands) : null,
    [context, commands, extensionCreator]
  );
  const extensionRef = useRefWrapper(extension);

  // Create function to re-dispatch actions to the store with mock-specific metadata
  const dispatch = useCallback(
    (action: AnyAction): void => {
      if (sendInvisibleMessage.match(action)) {
        storeDispatch(
          interpretInvisible({
            context,
            message: action.payload,
            id: idProvisioner.provision(),
          })
        );
      } else if (sendMessage.match(action)) {
        const id = idProvisioner.provision();
        const shouldPass =
          isNil(extensionRef.current) ||
          extensionRef.current.onSend(action.payload, id);
        if (shouldPass) {
          storeDispatch(
            interpretMessage({
              context,
              message: action.payload,
              id,
            })
          );
        }
      } else if (react.match(action)) {
        storeDispatch(interpretReact({ context, reaction: action.payload }));
      } else if (unreact.match(action)) {
        storeDispatch(interpretUnreact({ context, reaction: action.payload }));
      } else if (clearMessages.match(action)) {
        storeDispatch(interpretClear(context.guildId));
      }
    },
    [context, extensionRef, idProvisioner, storeDispatch]
  );
  const memoizedContext = useMemo(() => ({ dispatch }), [dispatch]);

  // Expose transformation function via context to deep message children
  const transformContext = useMemo(() => {
    const base: TransformMessage = transformMockMessage;
    if (isDefined(extensionRef.current)) {
      // Let extension wrap transformation function
      return { transform: extensionRef.current.wrapTransform(base), context };
    }

    return { transform: base, context };
  }, [extensionRef, context]);

  // Hook extension into lifecycle
  useEffectOnce(() => {
    return (): void => {
      if (isDefined(extensionRef.current)) {
        extensionRef.current.destruct();
      }
    };
  });

  // Manage connection timeout display
  const connected = useSelector(
    (state) => state.gateway.state === "established"
  );
  const [connectionError, setConnectionError] = useState(false);
  useEffect(() => {
    let timeout: number | undefined;
    if (!connected && !connectionError) {
      timeout = window.setTimeout(
        () => setConnectionError(true),
        ERROR_DISPLAY_DELAY
      );
    } else if (connected && connectionError) {
      setConnectionError(false);
    }

    return (): void => {
      if (isDefined(timeout)) {
        clearTimeout(timeout);
      }
    };
  }, [connected, connectionError]);

  return (
    <ErrorBoundary
      onError={(e: Error): void => error(e)}
      fallback={
        <div
          style={{
            height: formatDimension(addMissingUnit(height)),
            ...style,
          }}
        />
      }
    >
      <DiscordMockDispatchContext.Provider value={memoizedContext}>
        <TransformMessageContext.Provider value={transformContext}>
          <DiscordView
            style={{
              height: formatDimension(addMissingUnit(height)),
              ...style,
            }}
            className={className}
            channelName={channelName}
            messageSets={messageSets}
            loop={loop}
            displayError={connectionError && !offline}
            pause={!connected && !offline}
            clumps={clumps}
          />
        </TransformMessageContext.Provider>
      </DiscordMockDispatchContext.Provider>
    </ErrorBoundary>
  );
};

export default DiscordMock;
