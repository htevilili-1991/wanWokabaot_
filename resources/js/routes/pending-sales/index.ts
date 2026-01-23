import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\POSController::complete
* @see app/Http/Controllers/POSController.php:171
* @route '/pending-sales/{pendingSale}/complete'
*/
export const complete = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/pending-sales/{pendingSale}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::complete
* @see app/Http/Controllers/POSController.php:171
* @route '/pending-sales/{pendingSale}/complete'
*/
complete.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return complete.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::complete
* @see app/Http/Controllers/POSController.php:171
* @route '/pending-sales/{pendingSale}/complete'
*/
complete.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::complete
* @see app/Http/Controllers/POSController.php:171
* @route '/pending-sales/{pendingSale}/complete'
*/
const completeForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::complete
* @see app/Http/Controllers/POSController.php:171
* @route '/pending-sales/{pendingSale}/complete'
*/
completeForm.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, options),
    method: 'post',
})

complete.form = completeForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
export const cancel = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/pending-sales/{pendingSale}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
cancel.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
cancel.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
const cancelForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
cancelForm.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

cancel.form = cancelForm

const pendingSales = {
    complete: Object.assign(complete, complete),
    cancel: Object.assign(cancel, cancel),
}

export default pendingSales