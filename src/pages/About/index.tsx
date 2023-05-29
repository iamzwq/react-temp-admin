import { Button } from 'antd'
import { useCounterStore } from '~/stores'

const About = () => {
  const counter = useCounterStore((state) => state.counter)
  const increase = useCounterStore((state) => state.increase)

  return (
    <div>
      <div>About Page</div>
      <Button type="primary" onClick={() => increase(1)}>
        counter: {counter}
      </Button>
    </div>
  )
}

export default About
