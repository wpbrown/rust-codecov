#![allow(dead_code)]

use async_trait::async_trait;

fn main() {
    println!("codecovsample::main");
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
    use futures_lite::future::block_on;

    use super::*;

    #[test]
    fn test_main() {
        main();
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
