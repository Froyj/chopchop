type Props = {
  children: JSX.Element | JSX.Element[];
}

function CheckboxGroup({ children }: Props) {
  return (
    <div className="rounded-lg border p-4 flex flex-wrap">{children}</div>
  )
}

export default CheckboxGroup