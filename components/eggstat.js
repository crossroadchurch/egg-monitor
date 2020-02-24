import Egg from './egg'

export default (cur_egg) => {
  return (
    <div className="py-4 w-full flex border-gray-200 border-b-2 border-solid">
      <div className="px-4 py-2 text-gray-800">
        <Egg id={cur_egg.egg_id} />
      </div>
      <div className="px-4 text-gray-800 text-left">
        <p className="font-bold">{cur_egg.description}</p>
        <p>
          Found by {cur_egg.found_count}{' '}
          {cur_egg.found_count === 1 ? `team` : `teams`}
        </p>
        <p>Last found at {cur_egg.last_found.split(' ')[1]}</p>
      </div>
    </div>
  )
}
