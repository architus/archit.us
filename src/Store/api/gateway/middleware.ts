import { isNil, GATEWAY_API_BASE } from "Utility";
import { Middleware, Dispatch as ReduxDispatch, AnyAction } from "redux";
import { Store, Dispatch } from "Store";
import io from "socket.io-client";

/**
 * Represents the Gateway connection singleton to the architus Gateway socket.io API
 * @see https://docs.archit.us/internal/socketio/
 */
class GatewayConnection {
  private static _instance: GatewayConnection | undefined;
  static get instance(): GatewayConnection {
    if (isNil(GatewayConnection._instance)) {
      GatewayConnection._instance = new GatewayConnection();
    }
    return GatewayConnection._instance;
  }

  _isInitialized: boolean;
  _socket?: SocketIOClient.Socket;
  private constructor() {
    this._isInitialized = false;
    this.onSignOut = this.onSignOut.bind(this);
  }

  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  /**
   * Bootstraps a new connection without an elevation nonce, called after either a. session
   * restoration from local storage or b. loading unauthenticated
   * @see https://docs.archit.us/internal/api-reference/auth/
   */
  public initialize(): void {
    this._isInitialized = true;
    this._socket = io(GATEWAY_API_BASE);
  }

  /**
   * Bootstraps a new connection with an elevation nonce, called after a successful token
   * exchange, which begins an elevated connection
   * @see https://docs.archit.us/internal/api-reference/auth/
   */
  public authenticate(nonce: string): void {
    this._isInitialized = true;
    this._socket = io(`${GATEWAY_API_BASE}/?nonce=${nonce}`);
  }

  /**
   * Called upon session termination (either manual or as the result of an error)
   */
  public onSignOut(): void {
    this._isInitialized = false;
    // TODO implement connection de-elevation
  }
}

/**
 * Represents the Gateway connection singleton to the architus Gateway socket.io API
 * @see https://docs.archit.us/internal/socketio/
 */
export const Gateway: GatewayConnection = GatewayConnection.instance;

/**
 * Creates a Gateway API middleware that handles both server push messages and request-response
 * patterns
 * @param param0 Store instance
 */
const GatewayMiddleware: Middleware<{}, Store, ReduxDispatch<AnyAction>> = ({
  dispatch
}: {
  dispatch: Dispatch;
}) => (next: Dispatch) => (action: AnyAction): void => {
  // TODO Implement request-response pattern and server push messages
  next(action);
};

export default GatewayMiddleware;
