import { Suspense } from 'react'

const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense>
      <Component />
    </Suspense>
  )
}

export default lazyLoad
