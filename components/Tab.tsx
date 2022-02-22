import React, { useCallback, useEffect, useState } from 'react'

interface TabBase {
  children: React.ReactElement<TabPaneProps>[]
}

interface TabControlled extends TabBase {
  onActiveChange: (id: number) => void
  active: number
  initialActive?: never
}

interface TabUncontrolled extends TabBase {
  initialActive: number
  active?: never
  onActiveChange?: never
}

export type TabProps = TabControlled | TabUncontrolled

export type TabPaneProps = {
  title: string
  index: number
  children: React.ReactElement<any>
}

const Tab = ({
  children,
  active,
  onActiveChange,
  initialActive,
}: TabProps): JSX.Element => {
  // State for <TabUncontrolled> props
  const [uncontrolledTab, setUncontrolledTab] = useState<number | undefined>()

  useEffect(() => {
    // Set initial value for <TabUncontrolled> props
    if (typeof initialActive === 'number') setUncontrolledTab(initialActive)
  }, [initialActive])

  const handleActiveChange = (elm: any) => {
    if (typeof initialActive === 'number') setUncontrolledTab(elm.props.index)
    if (onActiveChange) onActiveChange(elm.props.index)
  }

  // Check if current tab is active by its index
  const isActive = useCallback(
    (tabIndex: number) => {
      if (typeof initialActive === 'number') return uncontrolledTab === tabIndex
      if (typeof active === 'number') return active === tabIndex
    },
    [initialActive, active, uncontrolledTab]
  )

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {children.map((elm: any) => (
          <strong
            key={`tab1-${elm.props.title}`}
            style={{
              padding: '10px',
              cursor: 'pointer',
              width: '200px',
              margin: '0',
              borderBottom: isActive(elm.props.index)
                ? '2px solid #19b9b9'
                : '2px solid #fff',
              background: isActive(elm.props.index) ? '#fff' : '#e3e3e3',
              fontWeight: isActive(elm.props.index) ? '700' : '400',
            }}
            onClick={() => handleActiveChange(elm)}
          >
            {elm.props.title}
          </strong>
        ))}
      </div>
      <div style={{ padding: '10px' }}>
        {typeof initialActive === 'number' && <>{children[uncontrolledTab!]}</>}
        {typeof active === 'number' && <>{children[active]}</>}
      </div>
    </div>
  )
}

const TabPane = ({ children }: TabPaneProps): JSX.Element => {
  return <div>{children}</div>
}

Tab.Pane = TabPane

export default Tab
