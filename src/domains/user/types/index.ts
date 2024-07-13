enum IdTypeEnum {
  REG_NO = 'REG_NO', // 개인회원
  BUSINESS_NO = 'BUSINESS_NO', // 법인회원
}

type IdType = keyof typeof IdTypeEnum

export { IdTypeEnum, IdType };