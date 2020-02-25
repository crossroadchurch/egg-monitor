import Egg from './egg'

export default (data) => {
  return (
    <div className="py-4 w-full flex">
      <div className="px-4 text-gray-800 text-left">
        <p>
          <span className="italic">{data.team}</span> found the egg{' '}
          <span className="font-bold">{data.description}</span> at{' '}
          {data.timestamp.split(' ')[1]}
        </p>
      </div>
      <div className="px-4 py-2 text-gray-800">
        <Egg id={data.egg_id} />
      </div>
    </div>
  )
}
