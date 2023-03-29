import { useEffect } from 'react'
const Water = ({ getAllWaters, waters }) => {
  useEffect(() => {
    getAllWaters()
  }, [])

  return (
    <div>
      {waters.map((water) => (
        <div>
          <div>{water.name}</div>
          <div>State: {water.state}</div>
          <div>Type of Body: {water.type}</div>

          <div>{water.species}</div>
        </div>
      ))}
    </div>
  )
}

export default Water
