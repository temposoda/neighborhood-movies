import * as Form from '@radix-ui/react-form';
import classNames from 'classnames';

type Kind = 'success' | 'warning' | 'info' | 'error' | 'primary';
type Size = 'xs' | 'sm' | 'md' | 'lg'
/**
 * Maps logical prop types to DaisyUI input classes:
 * https://daisyui.com/components/input/
 */
type Props = {
    kind?: Kind
    size?: Size
    messages?: { match: Form.FormMessageProps['match'], message: string, forceMatch?: boolean; }[]
    label: string;
    testId?: string;
} & Form.FormFieldProps & Form.FormControlProps

/**
 * This is exported separately so that "input" styles can easily
 * be applied to RadixUI's Form.Field components
 * (https://daisyui.com/components/input/)
 */
export function generateInputStyles({ kind, size }: Pick<Props, 'kind' | 'size'>) {
    const kinds: Record<Kind, string> = {
        error: 'input-error',
        info: 'input-info',
        primary: 'input-primary',
        success: 'input-success',
        warning: 'input-warning',
    }
    const sizes: Record<Size, string> = {
        'lg': 'input-lg',
        'md': 'input-md',
        'sm': 'input-sm',
        'xs': 'input-xs',
    }
    const input = classNames('input', 'input-bordered', 'w-full', 'max-w-xs', {
        [kinds[kind as Kind]]: Boolean(kind),
        [`data-[invalid]:input-error`]: Boolean(kind),
        [sizes[size as unknown as Size]]: Boolean(size),
    })
    const label = classNames('label')
    const message = classNames('label-text-alt')
    const container = classNames('form-control', 'w-full', 'max-w-xs')
    return { input, label, message, container }
}


function Input({ name, label, messages, kind, size, testId, ...inputProps }: Props) {
    const classes = generateInputStyles({ kind, size })
    return <Form.Field className={classes.container} name={name}>
        <label className={classes.label} htmlFor={name}>
            <Form.Label asChild><span className='label-text'>{label}</span></Form.Label>
        </label>
        <Form.Control className={classes.input} name={name} data-testid={testId} {...inputProps}></Form.Control>
        {messages?.length
            ? <ul className='flex flex-col gap-2'>{messages?.map(({ match, message, forceMatch }, index) => <li key={index}><Form.Message className={classes.message} match={match} forceMatch={forceMatch}>{message}</Form.Message></li>)}
            </ul>
            : null}
    </Form.Field>
}

export default Input