#![allow(dead_code)]

use async_trait::async_trait;

fn main() {
    println!("codecovsample::main");
}

enum Covered {
    Variant1,
    Variant2,
}
enum Uncovered {
    Variant1,
    Variant2,
}
enum PartiallyCovered {
    Variant1,
    Variant2,
}

fn fn_covered_enum(input: Covered) {
    match input {
        Covered::Variant1 => { println!("Variant1"); }
        Covered::Variant2 => { println!("Variant2"); }
    }
}

fn fn_uncovered_enum(input: Uncovered) {
    match input {
        Uncovered::Variant1 => { println!("Variant1"); }
        Uncovered::Variant2 => { println!("Variant2"); }
    }
}

fn fn_partially_covered_enum(input: PartiallyCovered) {
    match input {
        PartiallyCovered::Variant1 => { println!("Variant1"); }
        PartiallyCovered::Variant2 => { println!("Variant2"); }
    }
}

trait ATrait {
    fn covered(&self);
    fn uncovered(&self);
    fn func_covered();    
    fn func_uncovered();

    fn default_covered(&self) {
        println!("default_covered");
    }
    
    fn default_uncovered(&self) {
        println!("default_uncovered");
    }
}
trait BTrait {
    fn covered(&self);
    fn uncovered(&self);

    fn default_covered(&self) {
        println!("default_covered");
    }
    
    fn default_uncovered(&self) {
        println!("default_uncovered");
    }
}

struct ATraitImplDirect;

impl ATrait for ATraitImplDirect {
    fn covered(&self) {
        println!("covered")
    }

    fn uncovered(&self) {
        println!("uncovered");
    }

    fn func_covered() {
        println!("func_covered");
    }

    fn func_uncovered() {
        println!("func_covered");
    }
}

struct ATraitImplGeneric;

impl ATrait for ATraitImplGeneric {
    fn covered(&self) {
        println!("covered")
    }

    fn uncovered(&self) {
        println!("uncovered");
    }

    fn func_covered() {
        println!("func_covered");
    }

    fn func_uncovered() {
        println!("func_covered");
    }
}
struct BTraitImplBoxed;

impl BTrait for BTraitImplBoxed {
    fn covered(&self) {
        println!("covered")
    }

    fn uncovered(&self) {
        println!("uncovered");
    }
}

macro_rules! simple_rule {
    () => {
        println!("simple rule");
    };
}

fn call_simple_rule() {
    simple_rule!();
}

fn call_generic_atrait<T: ATrait>(input: T) {
    input.covered();
    input.default_covered();
    T::func_covered();
}

async fn async_func() {
    println!("async_func");
}

async fn async_func_anon() {
    let x = async {
        println!("async_func");
    };
    x.await;
}

#[async_trait]
trait AsyncTrait {
    async fn covered(&self);
    async fn uncovered(&self);
}

struct AsyncTraitImpl;

#[async_trait]
impl AsyncTrait for AsyncTraitImpl {
    async fn covered(&self) {
        println!("covered");
        async_func_from_trait_covered().await;
    }

    async fn uncovered(&self) {
        println!("uncovered");
    }
}

async fn async_func_from_trait_covered() {
    println!("covered async func from trait");
}

#[cfg(test)]
mod tests {
    use futures::executor::block_on;

    use super::*;

    #[test]
    fn test_main() {
        main();
    }

    #[test]
    fn cover_enum() {
        fn_covered_enum(Covered::Variant1);
        fn_covered_enum(Covered::Variant2);
    }

    #[test]
    fn partially_cover_enum() {
        fn_partially_covered_enum(PartiallyCovered::Variant1);
    }

    #[test]
    fn cover_atrait_direct() {
        let x = ATraitImplDirect;
        x.covered();
        x.default_covered();
        <ATraitImplDirect as ATrait>::func_covered();
    }
    #[test]
    fn cover_atrait_boxed() {
        let x: Box<dyn BTrait> = Box::new(BTraitImplBoxed);
        x.covered();
        x.default_covered();
    }

    #[test]
    fn cover_simple_rule() {
        call_simple_rule();
    }

    #[test]
    fn cover_generic_atrait() {
        let x = ATraitImplGeneric;
        call_generic_atrait(x);
    }

    #[test]
    fn cover_async_funcs() {
        block_on(async {
            async_func().await;
            async_func_anon().await;
        });
    }

    #[test]
    fn cover_async_trait() {
        block_on(async {
            let x: Box<dyn AsyncTrait> = Box::new(AsyncTraitImpl);
            x.covered().await;
        });
    }
}
