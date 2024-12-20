import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  href?: string;
  success?: boolean;
  outline?: boolean;
  large?: boolean;
  action?: boolean;
  checkout?: boolean;
  haveProducts?: boolean;
  disabled?: boolean;
  auth?: boolean;
  authGoogle?: boolean;
  more?: boolean;
  order?: boolean;
  cancel?: boolean;
  send?: boolean;
  className?: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export default function AppButton({
  to,
  href,
  success = false,
  outline = false,
  large = false,
  action = false,
  checkout = false,
  haveProducts = false,
  disabled = false,
  auth = false,
  authGoogle = false,
  more = false,
  order = false,
  cancel = false,
  send = false,
  className = '',
  children,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}: ButtonProps) {
  let Comp: React.ElementType = 'button';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = {
    onClick,
    ...passProps,
  };

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const baseClasses = 'inline-flex items-center justify-center font-bold cursor-pointer px-4 py-2 rounded-md select-none transition-all';
  const successClasses = success ? 'text-white bg-green-500 hover:bg-green-600' : '';
  const outlineClasses = outline ? 'text-gray-700 border border-gray-300 bg-white hover:border-gray-400' : '';
  const largeClasses = large ? 'w-full h-12 text-lg' : '';
  const actionClasses = action ? 'text-sm font-medium px-2 py-1' : '';
  const checkoutClasses = checkout ? 'w-full px-4 py-3' : '';
  const haveProductsClasses = haveProducts ? 'text-white bg-green-500 hover:bg-green-600' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const authClasses = auth ? 'px-6 py-3 rounded-full' : '';
  const authGoogleClasses = authGoogle ? 'border border-gray-300 rounded-full' : '';
  const moreClasses = more ? 'px-8 py-3 rounded-lg' : '';
  const orderClasses = order ? 'px-4 py-2 w-full text-xl' : '';
  const cancelClasses = cancel ? 'bg-red-500 hover:bg-red-600 text-white' : '';
  const sendClasses = send ? 'px-4 py-2 rounded-md' : '';

  const combinedClasses = [
    baseClasses,
    successClasses,
    outlineClasses,
    largeClasses,
    actionClasses,
    checkoutClasses,
    haveProductsClasses,
    disabledClasses,
    authClasses,
    authGoogleClasses,
    moreClasses,
    orderClasses,
    cancelClasses,
    sendClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Comp className={combinedClasses} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Comp>
  );
}
