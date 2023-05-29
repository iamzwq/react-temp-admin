import { Button } from 'antd'
import useCounterStore from '~/stores/counter'

const Home = () => {
  const counter = useCounterStore((state) => state.counter)
  const increase = useCounterStore((state) => state.increase)

  return (
    <div>
      <div>Home Page</div>
      <Button type="primary" onClick={() => increase(1)}>
        counter: {counter}
      </Button>
    </div>
  )
}

export default Home
