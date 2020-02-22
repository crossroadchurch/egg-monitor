export default (team) => {
  return (
    <div className="w-full flex justify-between">
      <div className="py-2 px-4 text-gray-800">
        <p>{team.name}</p>
      </div>
      <div className="py-2 px-4 text-gray-800">
        <p>{team.egg_count}</p>
      </div>
    </div>
  )
}
