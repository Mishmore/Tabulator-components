import type { NextPage } from 'next'
import Tab from '@/components/Tab'
import Tab2 from '@/components/Tab2'
import { useState } from 'react'

const tabsCollection = [
  { id: 1, title: 'Tab 1', body: 'This is Tab 1 body' },
  { id: 2, title: 'Tab 2', body: 'This is Tab 2 body' },
]

const Home: NextPage = () => {
  const [controlledTab, setControlledTab] = useState<number>(0)

  const handleActiveChange = (index: number) => {
    setControlledTab(index)
  }

  const [controlledTab2, setControlledTab2] = useState<number>(0)

  const handleActiveChange2 = (index: number) => {
    setControlledTab2(index)
  }

  return (
    <main>
      <h2>Tab (Task 1 & Task 2)</h2>
      <Tab active={controlledTab} onActiveChange={handleActiveChange}>
        {tabsCollection.map((elm: any, index: number) => (
          <Tab.Pane key={elm.id} title={elm.title} index={index}>
            <p>{elm.body}</p>
          </Tab.Pane>
        ))}
      </Tab>
      <hr />

      <h2>Tab2 (Bonus Task 1)</h2>
      <Tab2 active={controlledTab2} onActiveChange={handleActiveChange2}>
        {tabsCollection.map((elm: any, index: number) => (
          <Tab2.Pane
            key={`tab-pane-2-${elm.id}`}
            title={elm.title}
            index={index}
          >
            <p>{elm.body}</p>
          </Tab2.Pane>
        ))}
      </Tab2>
    </main>
  )
}

export default Home
