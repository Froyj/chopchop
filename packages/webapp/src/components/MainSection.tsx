type Props = {
  children?: JSX.Element | JSX.Element[];
}

function MainSection({ children }: Props) {
  return (
    // width = 100% - sidebar
    <div className="w-auto">{children}</div>
  )
}

export default MainSection