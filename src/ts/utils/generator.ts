
// export interface IteratorResultCallback<T, TReturn, R = void> {
//     (result: IteratorResult<T, TReturn>): R
// }

// export interface GeneratorWrapperOptions<T, TReturn, TNext> {
//     filter(val: IteratorResult<T, TReturn>): boolean
//     onComplete(): void
// }

// export interface GeneratorWrapper<T, TReturn, TNext> {
//     options: GeneratorWrapperOptions<T, TReturn, TNext>
//     generator: Generator<T, TReturn, TNext>
//     next(): IteratorResult<T, TReturn> 
//     nextIterationCycle(consumer: IteratorResultCallback<T, TReturn>, 
//                        pauseWhen?: IteratorResultCallback<T, TReturn, boolean>): void
// }

// export function generatorWrapper<T, TReturn, TNext>(
//     generator: Generator<T, TReturn, TNext>, 
//     options: GeneratorWrapperOptions<T, TReturn, TNext>
// ): GeneratorWrapper<T, TReturn, TNext> {
//     return {
//         options, generator,
//         next() {
//             var val;
//             do {
//                 val = generator.next();
//                 if (options.filter(val))
//                     return val;
//             } while (!val.done);
//             return val;
//         },
//         nextIterationCycle(consumer: IteratorResultCallback<T, TReturn>, 
//                            pauseWhen?: IteratorResultCallback<T, TReturn, boolean>) {
//             var { peekResult, newGenerator } = peekGenerator(generator);
//             if (pauseWhen && pauseWhen(peekResult)) {
//                 this.generator = ((newGenerator() as unknown) as Generator<T, TReturn, TNext>);
//                 return;
//             } 
            
//         }
//     }                                        
// }

export function* iteratorToGenerator<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>) {
    var val;
    do {
        val = iterator.next();
        yield val.value;
    } while (!val.done);
}

export function peekGenerator<T, TReturn, TNext>(generator: Generator<T, TReturn, TNext>) {
    const peekResult = generator.next();

    function* newGenerator() {
        yield peekResult.value;
        yield* generator;
    }

    return {
        peekResult, newGenerator
    };
}