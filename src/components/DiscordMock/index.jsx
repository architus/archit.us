import React from "react";
import PropTypes from "prop-types";
import {
  addMissingUnit,
  log,
  generateName,
  randomDigitString,
  takeOrReplenish,
  isNil
} from "../../util";
import { transformMessage } from "./transform";

import DiscordView from "./DiscordView";

const colors = ["#7e95e5", "#a0adbc", "#43B581", "#FAA61A", "#ef5b5b"];
const autBotUser = {
  clientId: 448546825532866560,
  avatarHash: "b2979364dd5230ac3dc7ea98cb35a02c",
  discriminator: 7145,
  username: "aut-bot",
  nameColor: "#d34c4f",
  bot: true
};
const makeEmojiResponseUser = baseUser => ({
  ...baseUser,
  clientId: baseUser.clientId + 1,
  nameColor: "white",
  bot: true
});

const discriminators = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
let discriminatorPool = { ...discriminators };
const nextDiscriminator = clientId => {
  return takeOrReplenish(
    discriminatorPool,
    clientId % 5,
    key => (key + 1) % 5,
    discriminators
  );
};

const shouldMergeClumps = (previousClump, nextClump) => {
  const { timestamp: prev } = previousClump;
  const { timestamp: next } = nextClump;
  return (
    !isNil(prev) &&
    !isNil(next) &&
    previousClump.sender.clientId === nextClump.sender.clientId &&
    prev.getHours() === next.getHours() &&
    prev.getMinutes() === next.getMinutes()
  );
};

const mergeClumps = (prev, next) => ({
  ...prev,
  messages: [...prev.messages, ...next.messages]
});

class DiscordMock extends React.Component {
  constructor(props) {
    super(props);
    const guildId = randomDigitString(9);
    const mockClientId = parseInt(guildId) % 100;
    const mockDiscriminator = nextDiscriminator(mockClientId);
    const mockNameColor = colors[mockDiscriminator];
    const mockUsername = generateName();
    const mockUser = {
      clientId: mockClientId,
      username: mockUsername,
      nameColor: mockNameColor,
      discriminator: mockDiscriminator,
      bot: false
    };
    const emojiResponder = makeEmojiResponseUser(mockUser);
    this.state = {
      guildId,
      thisUser: mockUser,
      clumps: [],
      users: {
        [mockClientId]: mockUser,
        [emojiResponder.clientId]: emojiResponder,
        [autBotUser.clientId]: autBotUser
      },
      // TODO temp
      messageQueue: [
        {
          content: `message with formatting: \`johny\` *ur* ~~really~~ **bad** __(nice brain)__. now it's even longer to test line wrapping in a more controlled way.`,
          clientId: mockClientId,
          messageId: 0,
          guildId
        },
        {
          content: `this doesn't <@${autBotUser.clientId}>`,
          clientId: autBotUser.clientId,
          messageId: 2,
          guildId
        },
        {
          content: `this mentions me <@${mockClientId}>`,
          clientId: autBotUser.clientId,
          messageId: 1,
          guildId
        },
        {
          content: `plain message (except it's not: it has emojis (POGGERS)) :grinning: :grimacing: :grin: :joy: :smiley: :smile: :sweat_smile: :laughing: :innocent: :wink: :blush: :slight_smile: :upside_down: :relaxed: :yum:`,
          clientId: autBotUser.clientId,
          messageId: 3,
          guildId
        },
        {
          content: `edge case: __content spanning\n multiple lines__`,
          clientId: autBotUser.clientId,
          messageId: 4,
          guildId
        },
        {
          content: `:grinning: :grimacing: :grin: :joy: :smiley: :smile: :sweat_smile: :laughing: :innocent: :wink: :blush: :slight_smile: :upside_down: :relaxed: :yum: :relieved: :heart_eyes: :kissing_heart: :kissing: :kissing_smiling_eyes: :kissing_closed_eyes: :stuck_out_tongue_winking_eye: :stuck_out_tongue_closed_eyes: :stuck_out_tongue: :money_mouth: :nerd: :sunglasses: :hugging: :smirk: :no_mouth: :neutral_face: :expressionless: :unamused: :rolling_eyes: :thinking: :flushed: :disappointed: :worried: :angry: :rage: :pensive: :confused: :slight_frown: :frowning2: :persevere: :confounded: :tired_face: :weary: :triumph: :open_mouth: :scream: :fearful: :cold_sweat: :hushed: :frowning: :anguished: :cry: :disappointed_relieved: :sleepy: :sweat: :sob: :dizzy_face: :astonished: :zipper_mouth: :mask: :thermometer_face: :head_bandage: :sleeping: :zzz: :poop: :smiling_imp: :imp: :japanese_ogre: :japanese_goblin: :skull: :ghost: :alien: :robot: :smiley_cat: :smile_cat: :joy_cat: :heart_eyes_cat: :smirk_cat: :kissing_cat: :scream_cat: :crying_cat_face: :pouting_cat: :raised_hands: :clap: :wave: :thumbsup: :thumbsdown: :punch: :fist: :v: :ok_hand: :raised_hand: :open_hands: :muscle: :pray: :point_up: :point_up_2: :point_down: :point_left: :point_right: :middle_finger: :hand_splayed: :metal: :vulcan: :writing_hand: :nail_care: :lips: :tongue: :ear: :nose: :eye: :eyes: :bust_in_silhouette: :busts_in_silhouette: :speaking_head: :baby: :boy: :girl: :man: :woman: :person_with_blond_hair: :older_man: :older_woman: :man_with_gua_pi_mao: :man_with_turban: :cop: :construction_worker: :guardsman: :spy: :santa: :angel: :princess: :bride_with_veil: :walking: :runner: :dancer: :dancers: :couple: :two_men_holding_hands: :two_women_holding_hands: :bow: :information_desk_person: :no_good: :ok_woman: :raising_hand: :person_with_pouting_face: :person_frowning: :haircut: :massage: :couple_with_heart: :couple_ww: :couple_mm: :couplekiss: :kiss_ww: :kiss_mm: :family: :family_mwg: :family_mwgb: :family_mwbb: :family_mwgg: :family_wwb: :family_wwg: :family_wwgb: :family_wwbb: :family_wwgg: :family_mmb: :family_mmg: :family_mmgb: :family_mmbb: :family_mmgg: :womans_clothes: :shirt: :jeans: :necktie: :dress: :bikini: :kimono: :lipstick: :kiss: :footprints: :high_heel: :sandal: :boot: :mans_shoe: :athletic_shoe: :womans_hat: :tophat: :helmet_with_cross: :mortar_board: :crown: :school_satchel: :pouch: :purse: :handbag: :briefcase: :eyeglasses: :dark_sunglasses: :ring: :closed_umbrella: :cowboy: :clown: :nauseated_face: :rofl: :drooling_face: :lying_face: :sneezing_face: :prince: :man_in_tuxedo: :mrs_claus: :face_palm: :shrug: :pregnant_woman: :selfie: :man_dancing: :call_me: :raised_back_of_hand: :left_facing_fist: :right_facing_fist: :handshake: :fingers_crossed:
:dog: :cat: :mouse: :hamster: :rabbit: :bear: :panda_face: :koala: :tiger: :lion_face: :cow: :pig: :pig_nose: :frog: :octopus: :monkey_face: :see_no_evil: :hear_no_evil: :speak_no_evil: :monkey: :chicken: :penguin: :bird: :baby_chick: :hatching_chick: :hatched_chick: :wolf: :boar: :horse: :unicorn: :bee: :bug: :snail: :beetle: :ant: :spider: :scorpion: :crab: :snake: :turtle: :tropical_fish: :fish: :blowfish: :dolphin: :whale: :whale2: :crocodile: :leopard: :tiger2: :water_buffalo: :ox: :cow2: :dromedary_camel: :camel: :elephant: :goat: :ram: :sheep: :racehorse: :pig2: :rat: :mouse2: :rooster: :turkey: :dove: :dog2: :poodle: :cat2: :rabbit2: :chipmunk: :feet: :dragon: :dragon_face: :cactus: :christmas_tree: :evergreen_tree: :deciduous_tree: :palm_tree: :seedling: :herb: :shamrock: :four_leaf_clover: :bamboo: :tanabata_tree: :leaves: :fallen_leaf: :maple_leaf: :ear_of_rice: :hibiscus: :sunflower: :green_apple: :apple: :pear: :tangerine: :lemon: :banana: :watermelon: :grapes: :strawberry: :melon: :bread: :honey_pot: :sweet_potato: :corn: :hot_pepper: :eggplant: :tomato: :pineapple: :peach: :cherries: :cheese: :poultry_leg: :meat_on_bone: :fried_shrimp: :cooking: :hamburger: :fries: :hotdog: :pizza: :spaghetti: :rice: :rice_ball: :curry: :bento: :sushi: :fish_cake: :stew: :ramen: :burrito: :taco: :oden: :dango: :shaved_ice: :ice_cream: :icecream: :cake: :birthday: :custard: :candy: :tropical_drink: :cocktail: :wine_glass: :beers: :beer: :cookie: :doughnut: :popcorn: :chocolate_bar: :lollipop: :champagne: :sake: :tea: :coffee: :baby_bottle: :fork_and_knife: :fork_knife_plate: :croissant: :avocado: :cucumber: :spoon: :tumbler_glass: :champagne_glass: :stuffed_flatbread: :shallow_pan_of_food: :salad: :french_bread: :carrot: :potato: :bacon: :egg: :milk: :peanuts: :kiwi: :pancakes: :rose: :tulip: :blossom: :cherry_blossom: :bouquet: :mushroom: :chestnut: :jack_o_lantern: :shell: :spider_web: :earth_americas: :earth_africa: :earth_asia: :full_moon: :waning_gibbous_moon: :last_quarter_moon: :waning_crescent_moon: :new_moon: :waxing_crescent_moon: :first_quarter_moon: :waxing_gibbous_moon: :new_moon_with_face: :full_moon_with_face: :first_quarter_moon_with_face: :last_quarter_moon_with_face: :sun_with_face: :crescent_moon: :star: :star2: :dizzy: :sparkles: :comet: :sunny: :white_sun_small_cloud: :partly_sunny: :white_sun_cloud: :white_sun_rain_cloud: :cloud: :cloud_rain: :thunder_cloud_rain: :cloud_lightning: :zap: :fire: :boom: :snowflake: :cloud_snow: :snowman2: :snowman: :wind_blowing_face: :dash: :cloud_tornado: :fog: :umbrella2: :umbrella: :droplet: :sweat_drops: :ocean: :eagle: :duck: :bat: :shark: :owl: :fox: :butterfly: :deer: :gorilla: :lizard: :rhino: :wilted_rose: :shrimp: :squid: :soccer: :basketball: :football: :baseball: :tennis: :volleyball: :rugby_football: :8ball: :golf: :golfer: :ping_pong: :badminton: :hockey: :field_hockey: :cricket: :skier: :snowboarder: :ice_skate: :bow_and_arrow: :horse_racing: :mountain_bicyclist: :bicyclist: :lifter: :basketball_player: :bath: :surfer: :swimmer: :rowboat: :fishing_pole_and_fish: :levitate: :trophy: :running_shirt_with_sash: :medal: :military_medal: :reminder_ribbon: :rosette: :ticket: :tickets: :performing_arts: :violin: :guitar: :trumpet: :saxophone: :musical_keyboard: :musical_score: :headphones: :microphone: :circus_tent: :art: :clapper: :video_game: :space_invader: :dart: :game_die: :slot_machine: :bowling: :cartwheel: :juggling: :wrestlers: :drum: :third_place: :second_place: :first_place: :fencer: :goal: :handball: :water_polo: :martial_arts_uniform: :boxing_glove: :red_car: :taxi: :blue_car: :bus: :trolleybus: :race_car: :police_car: :ambulance: :fire_engine: :minibus: :truck: :articulated_lorry: :tractor: :motorcycle: :bike: :rotating_light: :oncoming_police_car: :oncoming_bus: :oncoming_automobile: :oncoming_taxi: :aerial_tramway: :mountain_cableway: :suspension_railway: :railway_car: :train: :monorail: :bullettrain_side: :bullettrain_front: :light_rail: :mountain_railway: :steam_locomotive: :train2: :metro: :tram: :station: :helicopter: :airplane_small: :airplane: :airplane_departure: :airplane_arriving: :sailboat: :motorboat: :speedboat: :ferry: :cruise_ship: :rocket: :satellite_orbital: :seat: :anchor: :construction: :fuelpump: :busstop: :vertical_traffic_light: :traffic_light: :checkered_flag: :ship: :ferris_wheel: :roller_coaster: :carousel_horse: :construction_site: :foggy: :tokyo_tower: :factory: :fountain: :rice_scene: :mountain: :mountain_snow: :mount_fuji: :volcano: :japan: :camping: :tent: :park: :motorway: :railway_track: :sunrise: :sunrise_over_mountains: :desert: :beach: :island: :city_sunset: :city_dusk: :cityscape: :night_with_stars: :bridge_at_night: :milky_way: :stars: :sparkler: :fireworks: :rainbow:
:homes: :european_castle: :japanese_castle: :stadium: :statue_of_liberty: :house: :house_with_garden: :house_abandoned: :office: :department_store: :post_office: :european_post_office: :hospital: :bank: :hotel: :convenience_store: :school: :love_hotel: :wedding: :classical_building: :church: :mosque: :synagogue: :kaaba: :shinto_shrine: :scooter: :motor_scooter: :canoe: :100: :1234: :heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: :broken_heart: :heart_exclamation: :two_hearts: :revolving_hearts: :heartbeat: :heartpulse: :sparkling_heart: :cupid: :gift_heart: :heart_decoration: :peace: :cross: :star_and_crescent: :om_symbol: :wheel_of_dharma: :star_of_david: :six_pointed_star: :menorah: :yin_yang: :orthodox_cross: :place_of_worship: :ophiuchus: :aries: :taurus: :gemini: :cancer: :leo: :virgo: :libra: :scorpius: :sagittarius: :capricorn: :aquarius: :pisces: :id: :atom: :u7a7a: :u5272: :radioactive: :biohazard: :mobile_phone_off: :vibration_mode: :u6709: :u7121: :u7533: :u55b6: :u6708: :eight_pointed_black_star: :vs: :accept: :white_flower: :ideograph_advantage: :secret: :congratulations: :u5408: :u6e80: :u7981: :a: :b: :ab: :cl: :o2: :sos: :no_entry: :name_badge: :no_entry_sign: :x: :o: :anger: :hotsprings: :no_pedestrians: :do_not_litter: :no_bicycles: :non_potable_water: :underage: :no_mobile_phones: :exclamation: :grey_exclamation: :question: :grey_question: :bangbang: :interrobang: :low_brightness: :high_brightness: :trident: :fleur_de_lis: :part_alternation_mark: :warning: :children_crossing: :beginner: :recycle: :u6307: :chart:
:sparkle: :eight_spoked_asterisk: :negative_squared_cross_mark: :white_check_mark: :diamond_shape_with_a_dot_inside: :cyclone: :loop: :globe_with_meridians: :m: :atm: :sa: :passport_control: :customs: :baggage_claim: :left_luggage: :wheelchair: :no_smoking: :wc: :parking: :potable_water: :mens: :womens: :baby_symbol: :restroom: :put_litter_in_its_place: :cinema: :signal_strength: :koko: :ng: :ok: :up: :cool: :new: :free: :zero: :one: :two: :three: :four: :five: :six: :seven: :eight: :nine: :keycap_ten: :arrow_forward: :pause_button: :play_pause: :stop_button: :record_button: :track_next: :track_previous: :fast_forward: :rewind: :twisted_rightwards_arrows: :repeat: :repeat_one: :arrow_backward: :arrow_up_small: :arrow_down_small: :arrow_double_up: :arrow_double_down: :arrow_right: :arrow_left: :arrow_up: :arrow_down: :arrow_upper_right: :arrow_lower_right: :arrow_lower_left: :arrow_upper_left: :arrow_up_down: :left_right_arrow: :arrows_counterclockwise: :arrow_right_hook: :leftwards_arrow_with_hook: :arrow_heading_up: :arrow_heading_down: :hash: :asterisk: :information_source: :abc: :abcd: :capital_abcd: :symbols: :musical_note: :notes: :wavy_dash: :curly_loop: :heavy_check_mark: :arrows_clockwise: :heavy_plus_sign: :heavy_minus_sign: :heavy_division_sign: :heavy_multiplication_x: :heavy_dollar_sign: :currency_exchange: © ® ™ :end: :watch: :iphone: :calling: :computer: :keyboard: :desktop: :printer: :mouse_three_button: :trackball: :joystick: :movie_camera: :video_camera: :camera_with_flash: :camera: :vhs: :dvd: :cd: :floppy_disk: :minidisc: :compression: :projector: :film_frames: :telephone_receiver: :telephone: :pager: :fax: :tv: :radio: :microphone2: :level_slider: :electric_plug: :battery: :satellite: :hourglass: :hourglass_flowing_sand: :clock: :alarm_clock: :timer: :stopwatch: :control_knobs: :bulb: :flashlight: :candle: :wastebasket: :oil: :money_with_wings: :dollar: :yen: :euro: :pound: :nut_and_bolt: :pick: :tools: :hammer_pick: :hammer: :wrench: :scales: :gem: :credit_card: :moneybag: :gear: :chains: :gun: :bomb: :knife: :dagger: :crossed_swords: :shield: :smoking: :skull_crossbones: :hole: :microscope: :telescope: :alembic: :barber: :prayer_beads: :crystal_ball: :amphora: :urn: :coffin: :pill: :syringe: :thermometer: :label: :bookmark: :toilet: :shower: :bathtub: :key: :key2: :shopping_bags: :moyai: :beach_umbrella: :map: :frame_photo: :bellhop: :door: :bed: :sleeping_accommodation: :couch: :balloon: :flags: :ribbon: :gift: :confetti_ball: :tada: :dolls: :wind_chime: :crossed_flags:
:izakaya_lantern: :mailbox_with_no_mail: :mailbox_with_mail: :mailbox: :mailbox_closed: :postbox: :love_letter: :e_mail: :incoming_envelope: :envelope_with_arrow: :envelope: :package: :postal_horn: :inbox_tray: :outbox_tray: :scroll: :page_with_curl: :bookmark_tabs: :bar_chart: :chart_with_upwards_trend: :chart_with_downwards_trend: :notepad_spiral: :clipboard: :file_cabinet: :ballot_box: :card_box: :card_index: :calendar_spiral: :calendar: :date: :page_facing_up: :file_folder: :open_file_folder: :dividers: :newspaper2: :newspaper: :notebook: :closed_book: :green_book: :blue_book: :orange_book: :straight_ruler: :triangular_ruler: :scissors: :paperclips: :paperclip: :link: :book: :books: :ledger: :notebook_with_decorative_cover: :pushpin: :round_pushpin: :triangular_flag_on_post: :flag_white: :flag_black: :closed_lock_with_key: :lock: :unlock: :lock_with_ink_pen: :pen_ballpoint: :shopping_cart: :mag_right: :mag: :paintbrush: :crayon: :pencil2: :pencil: :black_nib: :pen_fountain: :back: :on: :top: :soon: :ballot_box_with_check: :radio_button: :white_circle: :black_circle: :red_circle: :large_blue_circle: :small_orange_diamond: :small_blue_diamond: :large_orange_diamond: :large_blue_diamond: :small_red_triangle: :black_small_square: :white_small_square: :black_large_square: :white_large_square: :small_red_triangle_down: :black_medium_square: :white_medium_square: :black_medium_small_square: :white_medium_small_square: :black_square_button: :white_square_button: :speaker: :sound: :loud_sound: :mute: :mega: :loudspeaker: :bell: :no_bell: :black_joker: :mahjong: :spades: :clubs: :hearts: :diamonds: :flower_playing_cards: :thought_balloon: :anger_right: :speech_balloon: :clock1: :clock2: :clock3: :clock4: :clock5: :clock6: :clock7: :clock8: :clock9: :clock10: :clock11: :clock12: :clock130: :clock230: :clock330: :clock430: :clock530: :clock630: :clock730: :clock830: :clock930: :clock1030: :clock1130: :clock1230: :eye_in_speech_bubble: :speech_left: :eject: :black_heart: :octagonal_sign:`,
          clientId: autBotUser.clientId,
          messageId: 6,
          guildId
        },
        {
          content: `message to test XSS stuff <script>window.alert('you've been pwned')</script> https://google.com [I'm an inline-style link](https://www.google.com)\nnewline right here`,
          clientId: autBotUser.clientId,
          messageId: 5,
          guildId
        },
        {
          content: `message with reactions`,
          reactions: [
            [728929, "\u2705"],
            [728929, "\u274c"],
            [728929, "\ud83e\udd37"]
          ],
          clientId: mockClientId + 1,
          messageId: 6,
          guildId
        }
      ]
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    setInterval(this.addNewMessage, 1000);
  }

  // TODO remove
  // [
  //   {
  //     emoji: `<img class="emoji" draggable="false" alt="📓" src="https://twemoji.maxcdn.com/2/72x72/1f4d3.png"/>`,
  //     number: 7,
  //     userHasReacted: true
  //   }
  // ],

  addNewMessage() {
    const { messageQueue, users } = this.state;
    if (messageQueue.length > 0) {
      const msg = messageQueue.pop();
      this.addMessage(msg.content, users[msg.clientId]);
    }
  }

  addMessage(content, sender) {
    this.setState(({ clumps, thisUser, users }) => {
      const { result, mentions } = transformMessage(content, users);
      const clump = {
        timestamp: new Date(),
        sender,
        messages: [
          {
            content: result,
            reactions: [],
            mentionsUser: mentions.includes(thisUser.clientId)
          }
        ]
      };

      let newClumps;
      if (clumps.length > 0) {
        const lastClump = clumps[clumps.length - 1];
        if (shouldMergeClumps(lastClump, clump)) {
          const otherClumps = clumps.slice(0, -1);
          newClumps = [...otherClumps, mergeClumps(lastClump, clump)];
        }
      }
      if (isNil(newClumps)) newClumps = [...clumps, clump];
      return {
        clumps: newClumps
      };
    });
  }

  render() {
    const { height = 100, channelName = "channel" } = this.props;
    const { clumps } = this.state;

    return (
      <DiscordView
        style={{ height: addMissingUnit(height) }}
        channelName={channelName}
        onSend={message => log(message)}
        clumps={clumps}
      />
    );
  }
}

export default DiscordMock;

DiscordMock.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  channelName: PropTypes.string
};
