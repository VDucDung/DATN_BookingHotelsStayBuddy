import ArrowDown from "../../assets/icons/ArrowDown.svg";
import ArrowRight from "../../assets/icons/ArrowRight.svg";
import Close from "../../assets/icons/Close.svg";
import Phone from "../../assets/icons/Phone.svg";
import VietnamFlag from "../../assets/icons/VietnamFlag.svg";
import ChinaFlag from "../../assets/icons/ChinaFlag.svg";
import JapanFlag from "../../assets/icons/JapanFlag.svg";
import EnglandFlag from "../../assets/icons/EnglandFlag.svg";
import Search from "../../assets/icons/Search.svg";
import User from "../../assets/icons/User.svg";
import Bag from "../../assets/icons/Bag.svg";
import Location from "../../assets/icons/Location.svg";
import Email from "../../assets/icons/Email.svg";
import StarContained from "../../assets/icons/Star-contained.svg";
import StarEmpty from "../../assets/icons/Start-empty.svg";
import StarHalf from "../../assets/icons/Star-half.svg";
import Eye from "../../assets/icons/Eye.svg";
import Heart from "../../assets/icons/Heart.svg";
import Category from "../../assets/icons/Category.svg";
import Coin from "../../assets/icons/Coin.svg";
import Vendor from "../../assets/icons/Vendor.svg";
import Rating from "../../assets/icons/Rating.svg";
import FirstPage from "../../assets/icons/FirstPage.svg";
import LastPage from "../../assets/icons/LastPage.svg";
import NextPage from "../../assets/icons/NextPage.svg";
import PreviousPage from "../../assets/icons/PrevPage.svg";
import Facebook from "../../assets/icons/Facebook.svg";
import Google from "../../assets/icons/Google.svg";
import ShowPassword from "../../assets/icons/ShowPassword.svg";
import HidePassword from "../../assets/icons/HidePassword.svg";
import Plus from "../../assets/icons/Plus.svg";
import Minus from "../../assets/icons/Minus.svg";
import Bin from "../../assets/icons/Bin.svg";
import Edit from "../../assets/icons/Edit.svg";
import Key from "../../assets/icons/Key.svg";
import Order from "../../assets/icons/Order.svg";
import Send from "../../assets/icons/Send.svg";
import Refresh from "../../assets/icons/Refresh.svg";
import Cart from "../../assets/icons/Cart.svg";
import Copy from "../../assets/icons/Copy.svg";
import LocationEmpty from "../../assets/icons/LocationEmpty.svg";
import PaymentMethod from "../../assets/icons/PaymentMethod.svg";
import Tag from "../../assets/icons/Tag.svg";
import Menu from "../../assets/icons/Menu.svg";
import ArrowSlider from "../../assets/icons/ArrowSlider.svg";

import { SVGProps } from "react";
import { IconName } from "@/type/iconName";

export const icons: Record<IconName, React.FC<SVGProps<SVGSVGElement>>> = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  close: Close,
  phone: Phone,
  vietnamFlag: VietnamFlag,
  chinaFlag: ChinaFlag,
  japanFlag: JapanFlag,
  englandFlag: EnglandFlag,
  search: Search,
  user: User,
  bag: Bag,
  location: Location,
  email: Email,
  starContained: StarContained,
  starEmpty: StarEmpty,
  starHalf: StarHalf,
  eye: Eye,
  heart: Heart,
  arrowSlider: ArrowSlider,
  category: Category,
  coin: Coin,
  vendor: Vendor,
  rating: Rating,
  firstPage: FirstPage,
  lastPage: LastPage,
  nextPage: NextPage,
  previousPage: PreviousPage,
  facebook: Facebook,
  google: Google,
  showPassword: ShowPassword,
  hidePassword: HidePassword,
  plus: Plus,
  minus: Minus,
  bin: Bin,
  edit: Edit,
  key: Key,
  order: Order,
  send: Send,
  refresh: Refresh,
  cart: Cart,
  copy: Copy,
  locationEmpty: LocationEmpty,
  paymentMethod: PaymentMethod,
  tag: Tag,
  menu: Menu,
};
