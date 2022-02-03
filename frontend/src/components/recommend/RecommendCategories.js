

const recommendCategories = [
  {
    name: 'all',
    text: '전체'
  },
  {
    name: 'location',
    text: '명소'
  },
  {
    name: 'resturant',
    text: '음식점'
  },
  {
    name: 'hotel',
    text: '숙박시설'
  },
  {
    name: 'festival',
    text: '행사'
  }
];

const RecommendCategories = () => {
  return (
    <div>
      {recommendCategories.map(c => (
        <span key={c.name}>{c.text}</span>
      ))}
    </div>
  )
}

export default RecommendCategories;