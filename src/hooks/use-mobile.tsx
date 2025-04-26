import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  breakpoint: 'mobile' | 'tablet' | 'desktop'
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: 'desktop'
  })

  React.useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT
      const isDesktop = width >= TABLET_BREAKPOINT

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        breakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      })
    }

    // Initialize on mount
    updateDeviceInfo()

    // Setup listeners for screen size changes
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}

// Keep backwards compatibility
export function useIsMobile(): boolean {
  const { isMobile } = useDevice()
  return isMobile
}
