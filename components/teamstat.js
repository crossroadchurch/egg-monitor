const placed_styles = {
  first_place: 'bg-yellow-300',
  second_place: 'bg-gray-400',
  third_place: 'bg-orange-700',
  '39_eggs': 'bg-pink-300',
  '38_eggs': 'bg-pink-400',
  '37_eggs': 'bg-pink-500',
  '36_eggs': 'bg-pink-600',
  '35_eggs': 'bg-red-300',
  '34_eggs': 'bg-red-400',
  '33_eggs': 'bg-red-500',
  '32_eggs': 'bg-red-600',
  '31_eggs': 'bg-orange-300',
  '30_eggs': 'bg-orange-400',
  '29_eggs': 'bg-orange-500',
  '28_eggs': 'bg-orange-600',
  '27_eggs': 'bg-yellow-400',
  '26_eggs': 'bg-yellow-500',
  '25_eggs': 'bg-yellow-600',
  '24_eggs': 'bg-green-200',
  '23_eggs': 'bg-green-300',
  '22_eggs': 'bg-green-400',
  '21_eggs': 'bg-green-500',
  '20_eggs': 'bg-green-600',
  '19_eggs': 'bg-teal-300',
  '18_eggs': 'bg-teal-400',
  '17_eggs': 'bg-teal-500',
  '16_eggs': 'bg-teal-600',
  '15_eggs': 'bg-blue-300',
  '14_eggs': 'bg-blue-400',
  '13_eggs': 'bg-blue-500',
  '12_eggs': 'bg-blue-600',
  '11_eggs': 'bg-indigo-300',
  '10_eggs': 'bg-indigo-400',
  '9_eggs': 'bg-indigo-500',
  '8_eggs': 'bg-indigo-600',
  '7_eggs': 'bg-indigo-700',
  '6_eggs': 'bg-purple-300',
  '5_eggs': 'bg-purple-400',
  '4_eggs': 'bg-purple-500',
  '3_eggs': 'bg-purple-600',
  '2_eggs': 'bg-gray-500',
  '1_eggs': 'bg-gray-600',
  '0_eggs': 'bg-gray-200'
}

export default (team) => {
  const div_class = `w-full flex justify-between ${
    placed_styles[team.place]
  } my-1 rounded-full`
  return (
    <div className={div_class}>
      <div className="py-2 px-4 text-gray-900">
        <p>{team.name}</p>
      </div>
      <div className="py-2 px-4 text-gray-900">
        <p>{team.egg_count}</p>
      </div>
    </div>
  )
}
