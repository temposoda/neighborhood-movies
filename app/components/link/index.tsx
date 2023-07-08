import type { LinkProps as RemixLinkProps } from "@remix-run/react";
import { Link as RemixLink } from "@remix-run/react";
import classNames from 'classnames';
import type { ReactNode } from 'react';

type Kind = 'success' | 'warning' | 'info' | 'error' | 'primary' | 'secondary';
/**
 * Maps logical prop types to DaisyUI link classes:
 * https://daisyui.com/components/link/
 */
type Props = {
    children: ReactNode;
    kind?: Kind
} & RemixLinkProps

/**
 * This is exported separately so that "link" styles can easily
 * be applied to Remix Link components
 * (https://remix.run/docs/en/1.18.1/guides/accessibility#links)
 */
export function generateLinkStyles({ kind }: Omit<Props, keyof RemixLinkProps>) {
    const kinds: Record<Kind, string> = {
        error: 'link-error',
        info: 'link-info',
        primary: 'link-primary',
        secondary: 'link-secondary',
        success: 'link-success',
        warning: 'link-warning',
    }
    return classNames('link', {
        [kinds[kind as Kind]]: Boolean(kind),
    })
}

/**
 * A native button element with the DaisyUI link classnames generated
 * from logical props: https://daisyui.com/components/link/
 */
function Link({
    kind = 'info',
    ...props
}: Props): ReactNode {
    const className = generateLinkStyles({ kind })

    return <RemixLink className={className} {...props} />
}

export default Link