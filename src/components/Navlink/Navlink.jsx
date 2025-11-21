import { NavLink } from "react-router-dom"

const Navlink = ({item}) => {
  const Icon = item.icon
  return (
    <li className="w-[192px]">
        <NavLink className="text-white hover:text-[#BDBDB] w-full gap-4 py-3 pl-4 hover:bg-[#509CDB]/70 active:bg-[#509CDB] rounded flex items-center" to={item.path || item.link}>
        {Icon && <Icon />}
            {item.label || item.name}
        </NavLink>
    </li>
  )
}

export default Navlink