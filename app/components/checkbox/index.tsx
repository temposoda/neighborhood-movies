import type { CheckboxProps } from '@radix-ui/react-checkbox';
import { Root } from '@radix-ui/react-checkbox';
import classNames from 'classnames';


type Kind = 'success' | 'warning' | 'info' | 'error' | 'primary';
type Size = 'xs' | 'sm' | 'md' | 'lg'
type Props = {
    kind?: Kind
    size?: Size
    label: string;
} & CheckboxProps


/**
 * This is exported separately so that "input" styles can easily
 * be applied to RadixUI's Form.Field components
 * (https://daisyui.com/components/input/)
 */
export function generateStyles({ kind, size }: Pick<Props, 'kind' | 'size'>) {
    const kinds: Record<Kind, string> = {
        error: 'checkbox-error',
        info: 'checkbox-info',
        primary: 'checkbox-primary',
        success: 'checkbox-success',
        warning: 'checkbox-warning',
    }
    const sizes: Record<Size, string> = {
        'lg': 'checkbox-lg',
        'md': 'checkbox-md',
        'sm': 'checkbox-sm',
        'xs': 'checkbox-xs',
    }
    const input = classNames('checkbox', {
        [kinds[kind as Kind]]: Boolean(kind),
        [`data-[invalid]:checkbox-error`]: Boolean(kind),
        [sizes[size as Size]]: Boolean(size),
    })
    const label = classNames('label', 'gap-2')
    const container = classNames('form-control')
    return { input, label, container }
}


function Checkbox({ name, kind = 'primary', size, label, ...inputProps }: Props) {
    const classes = generateStyles({ kind, size })
    return <div className={classes.container}>
        <label className={classes.label}>
            <span className="label-text">{label}</span>
            <Root asChild {...inputProps}>
                <input type="checkbox" className={classes.input} />
            </Root>
        </label>
    </div>
}

export default Checkbox