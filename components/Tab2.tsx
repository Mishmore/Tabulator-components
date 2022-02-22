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

const Tab2 = ({
  children,
  active,
  onActiveChange,
  initialActive,
}: TabProps): JSX.Element => {
  // Cache Array to save rendered tabs
  const [cache, setCache] = useState<number[]>([])

  // State for <TabUncontrolled> props
  const [uncontrolledTab, setUncontrolledTab] = useState<number | undefined>()

  useEffect(() => {
    if (typeof active === 'number' && cache.length === 0)
      setCache([...cache, active])

    // Set initial value for <TabUncontrolled> props
    if (typeof initialActive === 'number') {
      setUncontrolledTab(initialActive)
      if (cache.length === 0) setCache([...cache, initialActive])
    }
  }, [initialActive, cache, active])

  const handleActiveChange = (elm: any) => {
    if (typeof initialActive === 'number') setUncontrolledTab(elm.props.index)
    if (onActiveChange) onActiveChange(elm.props.index)
    if (!cache.includes(elm.props.index)) setCache([...cache, elm.props.index])
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
            key={`tab2-${elm.props.title}`}
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
        {typeof initialActive === 'number' &&
          children.map((elm: any) =>
            cache.includes(elm.props.index) ? (
              <div
                key={`tab2-body-${elm.props.title}`}
                style={{
                  display:
                    uncontrolledTab === elm.props.index ? 'block' : 'none',
                }}
              >
                {elm}
              </div>
            ) : (
              <></>
            )
          )}
        {typeof active === 'number' &&
          children.map((elm: any) =>
            cache.includes(elm.props.index) ? (
              <div
                key={`tab2-body-${elm.props.title}`}
                style={{
                  display: active === elm.props.index ? 'block' : 'none',
                }}
              >
                {elm}
              </div>
            ) : (
              <></>
            )
          )}
      </div>
    </div>
  )
}

const TabPane = ({ children }: TabPaneProps): JSX.Element => {
  return <div>{children}</div>
}

Tab2.Pane = TabPane

export default Tab2
