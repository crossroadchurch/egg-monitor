export default (egg) => {
  return (
    <div className="w-full flex justify-between">
      <div className="py-2 px-4 text-gray-800">
        <p>{egg.egg_id}</p>
      </div>
      <div className="py-2 px-4 text-gray-800">
        <p>{egg.found_count}</p>
      </div>
      <div className="py-2 px-4 text-gray-800">
        <p>{egg.last_found}</p>
      </div>
    </div>
  )
}
