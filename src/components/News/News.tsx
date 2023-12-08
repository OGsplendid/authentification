type TNewsItem = {
  content: string,
  id: string,
  image: string,
  title: string,
}

interface INewsProps {
  news: TNewsItem[],
}

export const News = ({ news }: INewsProps) => {
  if (!news) return;
  return (
    <div className="news-wrapper">
      {news.map((item) => (
        <div key={item.id} className="news-item">
          <img src={item.image} />
          <h4>{item.title}</h4>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  )
}
