import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pending-transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::addPayment
* @see app/Http/Controllers/PendingTransactionsController.php:76
* @route '/pending-sales/{pendingSale}/payment'
*/
export const addPayment = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPayment.url(args, options),
    method: 'post',
})

addPayment.definition = {
    methods: ["post"],
    url: '/pending-sales/{pendingSale}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::addPayment
* @see app/Http/Controllers/PendingTransactionsController.php:76
* @route '/pending-sales/{pendingSale}/payment'
*/
addPayment.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return addPayment.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::addPayment
* @see app/Http/Controllers/PendingTransactionsController.php:76
* @route '/pending-sales/{pendingSale}/payment'
*/
addPayment.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPayment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::addPayment
* @see app/Http/Controllers/PendingTransactionsController.php:76
* @route '/pending-sales/{pendingSale}/payment'
*/
const addPaymentForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addPayment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::addPayment
* @see app/Http/Controllers/PendingTransactionsController.php:76
* @route '/pending-sales/{pendingSale}/payment'
*/
addPaymentForm.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addPayment.url(args, options),
    method: 'post',
})

addPayment.form = addPaymentForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::update
* @see app/Http/Controllers/PendingTransactionsController.php:117
* @route '/pending-sales/{pendingSale}/edit'
*/
export const update = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: update.url(args, options),
    method: 'get',
})

update.definition = {
    methods: ["get","head"],
    url: '/pending-sales/{pendingSale}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::update
* @see app/Http/Controllers/PendingTransactionsController.php:117
* @route '/pending-sales/{pendingSale}/edit'
*/
update.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::update
* @see app/Http/Controllers/PendingTransactionsController.php:117
* @route '/pending-sales/{pendingSale}/edit'
*/
update.get = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: update.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::update
* @see app/Http/Controllers/PendingTransactionsController.php:117
* @route '/pending-sales/{pendingSale}/edit'
*/
update.head = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: update.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::update
* @see app/Http/Controllers/PendingTransactionsController.php:117
* @route '/pending-sales/{pendingSale}/edit'
*/
const updateForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: update.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::update
* @see app/Http/Controllers/PendingTransactionsController.php:117
* @route '/pending-sales/{pendingSale}/edit'
*/
updateForm.get = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: update.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::update
* @see app/Http/Controllers/PendingTransactionsController.php:117
* @route '/pending-sales/{pendingSale}/edit'
*/
updateForm.head = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:140
* @route '/pending-sales/{pendingSale}'
*/
export const destroy = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pending-sales/{pendingSale}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:140
* @route '/pending-sales/{pendingSale}'
*/
destroy.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:140
* @route '/pending-sales/{pendingSale}'
*/
destroy.delete = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::destroy
* @see app/Http/Controllers/PendingTransactionsController.php:140
* @route '/pending-sales/{pendingSale}'
*/
const destroyForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PendingTransactionsController.php:140
* @route '/pending-sales/{pendingSale}'
*/
destroyForm.delete = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PendingTransactionsController = { index, addPayment, update, destroy }

export default PendingTransactionsController