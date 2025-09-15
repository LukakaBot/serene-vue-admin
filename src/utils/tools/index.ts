import type { ButtonProps } from 'naive-ui'
import type { Slot } from 'vue'
import type { BaseIconProps } from '@/components/BaseIcon/types'
import { NButton } from 'naive-ui'
import BaseIcon from '@/components/BaseIcon/index.vue'

interface FormatNumberWithThousandOpts extends Intl.NumberFormatOptions {
  locale: Intl.LocalesArgument
}

/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function addLight(color: string, amount: number) {
  const cc = Number.parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function lighten(color: string, amount: number) {
  color = color.includes('#') ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount,
  )}${addLight(color.substring(4, 6), amount)}`
}

export function renderIcon(props: BaseIconProps) {
  return h(BaseIcon, props)
}

export function renderButton(
  props: ButtonProps,
  slot: Slot | (() => string) | string,
) {
  return h(NButton, props, slot)
}

export function formatNumberWithThousand(
  num: number,
  opts: FormatNumberWithThousandOpts = { locale: 'en-US' },
) {
  const { locale, ...rest } = opts
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
    ...rest,
  }
  return new Intl.NumberFormat(locale, options).format(num)
}
