type Props = {
  children?: JSX.Element | JSX.Element[];
};

function MainSection({ children }: Props) {
  return <div className="w-[calc(100%-250px)]">{children}</div>;
}

export default MainSection;
