export const statusColor: Record<string, any> = {
  success: '#31AF91',
  failure: '#FF0B0B'
}

export const statusImage: Record<string, any> = {
  success:
    'https://raw.githubusercontent.com/xseededucation/action_assets/master/success-128.png',
  failure:
    'https://raw.githubusercontent.com/xseededucation/action_assets/master/failure-128.png'
}

export const statusMessage: Record<string, any> = {
  success: 'Run was successful',
  failure: 'Run failed'
}

export type StatusColorKey = keyof typeof statusColor
export type StatusImageKey = keyof typeof statusImage
export type StatusMessageKey = keyof typeof statusMessage