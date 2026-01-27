import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PendingTransactionsController::edit
* @see app/Http/Controllers/PendingTransactionsController.php:119
* @route '/pending-sales/{pendingSale}/edit'
*/
export const edit = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/pending-sales/{pendingSale}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::edit
* @see app/Http/Controllers/PendingTransactionsController.php:119
* @route '/pending-sales/{pendingSale}/edit'
*/
edit.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pendingSale: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pendingSale: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pendingSale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pendingSale: typeof args.pendingSale === 'object'
        ? args.pendingSale.id
        : args.pendingSale,
    }

    return edit.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::edit
* @see app/Http/Controllers/PendingTransactionsController.php:119
* @route '/pending-sales/{pendingSale}/edit'
*/
edit.get = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::edit
* @see app/Http/Controllers/PendingTransactionsController.php:119
* @route '/pending-sales/{pendingSale}/edit'
*/
edit.head = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::edit
* @see app/Http/Controllers/PendingTransactionsController.php:119
* @route '/pending-sales/{pendingSale}/edit'
*/
const editForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::edit
* @see app/Http/Controllers/PendingTransactionsController.php:119
* @route '/pending-sales/{pendingSale}/edit'
*/
editForm.get = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::edit
* @see app/Http/Controllers/PendingTransactionsController.php:119
* @route '/pending-sales/{pendingSale}/edit'
*/
editForm.head = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::updateTransaction
* @see app/Http/Controllers/PendingTransactionsController.php:142
* @route '/pending-sales/{pendingSale}/update'
*/
export const updateTransaction = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateTransaction.url(args, options),
    method: 'post',
})

updateTransaction.definition = {
    methods: ["post"],
    url: '/pending-sales/{pendingSale}/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::updateTransaction
* @see app/Http/Controllers/PendingTransactionsController.php:142
* @route '/pending-sales/{pendingSale}/update'
*/
updateTransaction.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pendingSale: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pendingSale: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pendingSale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pendingSale: typeof args.pendingSale === 'object'
        ? args.pendingSale.id
        : args.pendingSale,
    }

    return updateTransaction.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::updateTransaction
* @see app/Http/Controllers/PendingTransactionsController.php:142
* @route '/pending-sales/{pendingSale}/update'
*/
updateTransaction.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateTransaction.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::updateTransaction
* @see app/Http/Controllers/PendingTransactionsController.php:142
* @route '/pending-sales/{pendingSale}/update'
*/
const updateTransactionForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateTransaction.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::updateTransaction
* @see app/Http/Controllers/PendingTransactionsController.php:142
* @route '/pending-sales/{pendingSale}/update'
*/
updateTransactionForm.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateTransaction.url(args, options),
    method: 'post',
})

updateTransaction.form = updateTransactionForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::payment
* @see app/Http/Controllers/PendingTransactionsController.php:78
* @route '/pending-sales/{pendingSale}/payment'
*/
export const payment = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(args, options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/pending-sales/{pendingSale}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::payment
* @see app/Http/Controllers/PendingTransactionsController.php:78
* @route '/pending-sales/{pendingSale}/payment'
*/
payment.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pendingSale: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pendingSale: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pendingSale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pendingSale: typeof args.pendingSale === 'object'
        ? args.pendingSale.id
        : args.pendingSale,
    }

    return payment.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::payment
* @see app/Http/Controllers/PendingTransactionsController.php:78
* @route '/pending-sales/{pendingSale}/payment'
*/
payment.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::payment
* @see app/Http/Controllers/PendingTransactionsController.php:78
* @route '/pending-sales/{pendingSale}/payment'
*/
const paymentForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::payment
* @see app/Http/Controllers/PendingTransactionsController.php:78
* @route '/pending-sales/{pendingSale}/payment'
*/
paymentForm.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payment.url(args, options),
    method: 'post',
})

payment.form = paymentForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::bulkDestroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/bulk-delete'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

bulkDestroy.definition = {
    methods: ["delete"],
    url: '/pending-sales/bulk-delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::bulkDestroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/bulk-delete'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::bulkDestroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/bulk-delete'
*/
bulkDestroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDestroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::bulkDestroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/bulk-delete'
*/
const bulkDestroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDestroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::bulkDestroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/bulk-delete'
*/
bulkDestroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bulkDestroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

bulkDestroy.form = bulkDestroyForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/{pendingSale?}'
*/
export const destroy = (args?: { pendingSale?: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pending-sales/{pendingSale?}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/{pendingSale?}'
*/
destroy.url = (args?: { pendingSale?: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pendingSale: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pendingSale: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pendingSale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "pendingSale",
    ])

    const parsedArgs = {
        pendingSale: typeof args?.pendingSale === 'object'
        ? args.pendingSale.id
        : args?.pendingSale,
    }

    return destroy.definition.url
            .replace('{pendingSale?}', parsedArgs.pendingSale?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/{pendingSale?}'
*/
destroy.delete = (args?: { pendingSale?: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/{pendingSale?}'
*/
const destroyForm = (args?: { pendingSale?: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:198
* @route '/pending-sales/{pendingSale?}'
*/
destroyForm.delete = (args?: { pendingSale?: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const pendingSales = {
    edit: Object.assign(edit, edit),
    updateTransaction: Object.assign(updateTransaction, updateTransaction),
    payment: Object.assign(payment, payment),
    bulkDestroy: Object.assign(bulkDestroy, bulkDestroy),
    destroy: Object.assign(destroy, destroy),
}

export default pendingSales