import { Link } from "react-router-dom"

export const Hero = () => {
  return (
    <Link
      to="/game"
      className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
    >
      Play Now
    </Link>
  )
}
