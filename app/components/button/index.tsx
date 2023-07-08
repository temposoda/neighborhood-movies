import type { ButtonHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'


type Kind = 'success' | 'warning' | 'info' | 'error' | 'link' | 'primary';
/**
 * Maps logical prop types to DaisyUI btn classes:
 * https://daisyui.com/components/button/
 */
type Props = {
    active?: boolean;
    children: ReactNode;
    kind?: Kind
    outline?: boolean;
    shape?: 'wide' | 'square' | 'circle' | 'block';
    size?: 'lg' | 'sm' | 'md' | 'xs';
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * This is exported separately so that "button" styles can easily
 * be applied to other Button-like elements, such as Radix <Form.Submit />
 * (https://www.radix-ui.com/docs/primitives/components/form)
 * or Radix <Toolbar.Button />
 * (https://www.radix-ui.com/docs/primitives/components/toolbar#button)
 */
export function generateStyles(props: Omit<Props, 'children'>) {
    /**
     * See for more context:
     * https://www.codeconcisely.com/posts/tailwind-css-dynamic-class/
     * https://tailwindcss.com/docs/content-configuration#dynamic-class-names
     */
    const kinds: Record<Kind, string> = {
        success: 'btn-success',
        primary: 'btn-primary',
        warning: 'btn-warning',
        error: 'btn-error',
        info: 'btn-info',
        link: 'btn-link'
    }
    return classNames('btn', {
        "btn-active": props.active,
        "btn-outline": props.outline,
        [kinds[props.kind as Kind]]: Boolean(props.kind),
        [`btn-${props.shape}`]: Boolean(props.shape),
        [`btn-${props.size}`]: Boolean(props.size),
    })
}

/**
 * A native button element with the DaisyUI button classnames generated
 * from logical props: https://daisyui.com/components/button/
 */
function Button({
    active = false,
    kind = 'primary',
    outline = false,
    size,
    shape,
    ...props
}: Props): ReactNode {
    const className = generateStyles({ active, kind, outline, size, shape })

    return <button className={className} {...props} />
}

export default Button