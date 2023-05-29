interface Props {
  name: string
  prefix?: string
  color?: string
}

const SvgIcon: React.FC<Props> = ({ name, prefix = 'icon', color = 'currentColor', ...props }) => {
  const symbolId = `#${prefix}-${name}`

  return (
    <svg {...props} aria-hidden="true">
      <use href={symbolId} fill={color} />
    </svg>
  )
}

export default SvgIcon
