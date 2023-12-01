export type TIntro = {
    intro: string,
}

export const Intro = ({ intro }: TIntro) => {
  return (
    <div className='intro-wrapper'>
        <div className='intro'>
            <p className='intro-text'>{intro}</p>
        </div>
    </div>
  )
}
