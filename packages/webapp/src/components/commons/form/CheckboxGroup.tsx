type Props = {
  children: JSX.Element | JSX.Element[];
}

function CheckboxGroup({ children }: Props) {
  return (
    <div className="rounded-lg">{children}</div>
  )
}

export default CheckboxGroup