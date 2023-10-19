/**
 * 手机号正则
 */
export const telephoneReg = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
/**
 * 手机号匹配规则
 */
export const telephoneRules = [
  {
    rule: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
    info: '请输入有效的电话号码'
  }
]
/**
 * 手机验证码正则
 */
export const smscodeReg = /^\d{6}$/
/**
 * 手机验证码匹配规则
 */
export const smscodeRules = [
  {
    rule: /^\d{6}$/,
    info: '请输入六位验证码'
  }
]
/**
 * 账号正则
 * 8 - 16位字符，开头必须为字母
 */
export const usernameReg = /^.{4,10}$/
/**
 * 注册账号匹配规则
 */
export const usernameRegisterRules = [
    {
      rule: usernameReg,
      info: '账号需由4-10位字符组成'
    }
]
/**
 * 登录账号匹配规则
 */
export const usernameRules = [
    {
      rule: (username?: string) => {
        return !!username && username.length > 0
      },
      info: '您的账号为空'
    }
]

/**
 * 密码正则
 */
export const passwordReg = /^[A-Za-z][A-Za-z0-9]{7,15}$/
/**
 * 注册密码匹配规则
 */
export const passwordRegisterRules = [
  {
    rule: passwordReg,
    info: '密码需由以字母开头的8-16位数字和字母组成'
  }
]
/**
 * 登录密码匹配规则
 */
export const passwordRules = [
  {
    rule: (password?: string) => {
      return !!password && password.length > 0
    },
    info: '您的密码为空'
  }
]

export const emailReg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/

export const emailRules = [
  {
    rule: (email?: string) => {
      return !!email && email.length > 0
    },
    info: '您的邮箱为空'
  },{
    rule: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
    info: '非法邮箱'
  }
]