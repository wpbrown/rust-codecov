var data = {lines:[
{"lineNum":"    1","line":"#![allow(dead_code)]","class":"lineCov","hits":"1","order":"33",},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"use async_trait::async_trait;"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"fn main() {","class":"lineCov","hits":"1","order":"88",},
{"lineNum":"    6","line":"    println!(\"codecovsample::main\");","class":"lineCov","hits":"1","order":"90",},
{"lineNum":"    7","line":"}","class":"lineCov","hits":"1","order":"49",},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"enum Covered {"},
{"lineNum":"   10","line":"    Variant1,"},
{"lineNum":"   11","line":"    Variant2,"},
{"lineNum":"   12","line":"}"},
{"lineNum":"   13","line":"enum Uncovered {"},
{"lineNum":"   14","line":"    Variant1,"},
{"lineNum":"   15","line":"    Variant2,"},
{"lineNum":"   16","line":"}"},
{"lineNum":"   17","line":"enum PartiallyCovered {"},
{"lineNum":"   18","line":"    Variant1,"},
{"lineNum":"   19","line":"    Variant2,"},
{"lineNum":"   20","line":"}"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"fn fn_covered_enum(input: Covered) {","class":"lineCov","hits":"1","order":"79",},
{"lineNum":"   23","line":"    match input {","class":"lineCov","hits":"1","order":"53",},
{"lineNum":"   24","line":"        Covered::Variant1 => { println!(\"Variant1\"); }","class":"lineCov","hits":"1","order":"91",},
{"lineNum":"   25","line":"        Covered::Variant2 => { println!(\"Variant2\"); }","class":"lineCov","hits":"1","order":"61",},
{"lineNum":"   26","line":"    }"},
{"lineNum":"   27","line":"}","class":"lineCov","hits":"1","order":"82",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"fn fn_uncovered_enum(input: Uncovered) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   30","line":"    match input {","class":"lineNoCov","hits":"0",},
{"lineNum":"   31","line":"        Uncovered::Variant1 => { println!(\"Variant1\"); }","class":"lineNoCov","hits":"0",},
{"lineNum":"   32","line":"        Uncovered::Variant2 => { println!(\"Variant2\"); }","class":"lineNoCov","hits":"0",},
{"lineNum":"   33","line":"    }"},
{"lineNum":"   34","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"fn fn_partially_covered_enum(input: PartiallyCovered) {","class":"lineCov","hits":"1","order":"93",},
{"lineNum":"   37","line":"    match input {","class":"lineCov","hits":"1","order":"71",},
{"lineNum":"   38","line":"        PartiallyCovered::Variant1 => { println!(\"Variant1\"); }","class":"lineCov","hits":"1","order":"94",},
{"lineNum":"   39","line":"        PartiallyCovered::Variant2 => { println!(\"Variant2\"); }","class":"lineNoCov","hits":"0",},
{"lineNum":"   40","line":"    }"},
{"lineNum":"   41","line":"}","class":"lineCov","hits":"1","order":"96",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"trait ATrait {"},
{"lineNum":"   44","line":"    fn covered(&self);"},
{"lineNum":"   45","line":"    fn uncovered(&self);"},
{"lineNum":"   46","line":"    fn func_covered();"},
{"lineNum":"   47","line":"    fn func_uncovered();"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    fn default_covered(&self) {","class":"lineCov","hits":"1","order":"14",},
{"lineNum":"   50","line":"        println!(\"default_covered\");","class":"lineCov","hits":"1","order":"13",},
{"lineNum":"   51","line":"    }","class":"lineCov","hits":"1","order":"12",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    fn default_uncovered(&self) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   54","line":"        println!(\"default_uncovered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   55","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"   56","line":"}"},
{"lineNum":"   57","line":"trait BTrait {"},
{"lineNum":"   58","line":"    fn covered(&self);"},
{"lineNum":"   59","line":"    fn uncovered(&self);"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    fn default_covered(&self) {","class":"lineCov","hits":"1","order":"11",},
{"lineNum":"   62","line":"        println!(\"default_covered\");","class":"lineCov","hits":"1","order":"10",},
{"lineNum":"   63","line":"    }","class":"lineCov","hits":"1","order":"54",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    fn default_uncovered(&self) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   66","line":"        println!(\"default_uncovered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   67","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"   68","line":"}"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"struct ATraitImplDirect;"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"impl ATrait for ATraitImplDirect {"},
{"lineNum":"   73","line":"    fn covered(&self) {","class":"lineCov","hits":"1","order":"75",},
{"lineNum":"   74","line":"        println!(\"covered\")","class":"lineCov","hits":"1","order":"45",},
{"lineNum":"   75","line":"    }","class":"lineCov","hits":"1","order":"59",},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"    fn uncovered(&self) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   78","line":"        println!(\"uncovered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   79","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    fn func_covered() {","class":"lineCov","hits":"1","order":"25",},
{"lineNum":"   82","line":"        println!(\"func_covered\");","class":"lineCov","hits":"1","order":"64",},
{"lineNum":"   83","line":"    }","class":"lineCov","hits":"1","order":"84",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    fn func_uncovered() {","class":"lineNoCov","hits":"0",},
{"lineNum":"   86","line":"        println!(\"func_covered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   87","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"   88","line":"}"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"struct ATraitImplGeneric;"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"impl ATrait for ATraitImplGeneric {"},
{"lineNum":"   93","line":"    fn covered(&self) {","class":"lineCov","hits":"1","order":"38",},
{"lineNum":"   94","line":"        println!(\"covered\")","class":"lineCov","hits":"1","order":"42",},
{"lineNum":"   95","line":"    }","class":"lineCov","hits":"1","order":"35",},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    fn uncovered(&self) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   98","line":"        println!(\"uncovered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   99","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    fn func_covered() {","class":"lineCov","hits":"1","order":"29",},
{"lineNum":"  102","line":"        println!(\"func_covered\");","class":"lineCov","hits":"1","order":"51",},
{"lineNum":"  103","line":"    }","class":"lineCov","hits":"1","order":"27",},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"    fn func_uncovered() {","class":"lineNoCov","hits":"0",},
{"lineNum":"  106","line":"        println!(\"func_covered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"  107","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"  108","line":"}"},
{"lineNum":"  109","line":"struct BTraitImplBoxed;"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"impl BTrait for BTraitImplBoxed {"},
{"lineNum":"  112","line":"    fn covered(&self) {","class":"lineCov","hits":"1","order":"24",},
{"lineNum":"  113","line":"        println!(\"covered\")","class":"lineCov","hits":"1","order":"23",},
{"lineNum":"  114","line":"    }","class":"lineCov","hits":"1","order":"22",},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    fn uncovered(&self) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  117","line":"        println!(\"uncovered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"  118","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"  119","line":"}"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"macro_rules! simple_rule {"},
{"lineNum":"  122","line":"    () => {"},
{"lineNum":"  123","line":"        println!(\"simple rule\");"},
{"lineNum":"  124","line":"    };"},
{"lineNum":"  125","line":"}"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"fn call_simple_rule() {","class":"lineCov","hits":"1","order":"21",},
{"lineNum":"  128","line":"    simple_rule!();","class":"lineCov","hits":"1","order":"32",},
{"lineNum":"  129","line":"}","class":"lineCov","hits":"1","order":"20",},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"fn call_generic_atrait<T: ATrait>(input: T) {","class":"lineCov","hits":"1","order":"9",},
{"lineNum":"  132","line":"    input.covered();","class":"lineCov","hits":"1","order":"87",},
{"lineNum":"  133","line":"    input.default_covered();","class":"lineCov","hits":"1","order":"89",},
{"lineNum":"  134","line":"    T::func_covered();","class":"lineCov","hits":"1","order":"48",},
{"lineNum":"  135","line":"}","class":"lineCov","hits":"1","order":"8",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"async fn async_func() {","class":"lineCov","hits":"1","order":"19",},
{"lineNum":"  138","line":"    println!(\"async_func\");","class":"lineCov","hits":"1","order":"7",},
{"lineNum":"  139","line":"}","class":"lineCov","hits":"1","order":"18",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"async fn async_func_anon() {","class":"lineCov","hits":"1","order":"17",},
{"lineNum":"  142","line":"    let x = async {","class":"lineCov","hits":"1","order":"6",},
{"lineNum":"  143","line":"        println!(\"async_func\");","class":"lineCov","hits":"1","order":"5",},
{"lineNum":"  144","line":"    };","class":"lineCov","hits":"1","order":"4",},
{"lineNum":"  145","line":"    x.await;","class":"lineCov","hits":"1","order":"3",},
{"lineNum":"  146","line":"}","class":"lineCov","hits":"1","order":"16",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"#[async_trait]"},
{"lineNum":"  149","line":"trait AsyncTrait {"},
{"lineNum":"  150","line":"    async fn covered(&self);"},
{"lineNum":"  151","line":"    async fn uncovered(&self);"},
{"lineNum":"  152","line":"}"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"struct AsyncTraitImpl;"},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"#[async_trait]"},
{"lineNum":"  157","line":"impl AsyncTrait for AsyncTraitImpl {"},
{"lineNum":"  158","line":"    async fn covered(&self) {","class":"lineCov","hits":"1","order":"92",},
{"lineNum":"  159","line":"        println!(\"covered\");","class":"lineCov","hits":"1","order":"66",},
{"lineNum":"  160","line":"        async_func_from_trait_covered().await;","class":"lineCov","hits":"1","order":"1",},
{"lineNum":"  161","line":"    }","class":"lineCov","hits":"1","order":"68",},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    async fn uncovered(&self) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  164","line":"        println!(\"uncovered\");","class":"lineNoCov","hits":"0",},
{"lineNum":"  165","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"  166","line":"}"},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"async fn async_func_from_trait_covered() {","class":"lineCov","hits":"1","order":"95",},
{"lineNum":"  169","line":"    println!(\"covered async func from trait\");","class":"lineCov","hits":"1","order":"2",},
{"lineNum":"  170","line":"}","class":"lineCov","hits":"1","order":"15",},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"#[cfg(test)]"},
{"lineNum":"  173","line":"mod tests {"},
{"lineNum":"  174","line":"    use futures::executor::block_on;"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    use super::*;"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    #[test]"},
{"lineNum":"  179","line":"    fn test_main() {","class":"lineCov","hits":"1","order":"41",},
{"lineNum":"  180","line":"        main();","class":"lineCov","hits":"1","order":"63",},
{"lineNum":"  181","line":"    }","class":"lineCov","hits":"1","order":"46",},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"    #[test]"},
{"lineNum":"  184","line":"    fn cover_enum() {","class":"lineCov","hits":"1","order":"47",},
{"lineNum":"  185","line":"        fn_covered_enum(Covered::Variant1);","class":"lineCov","hits":"1","order":"69",},
{"lineNum":"  186","line":"        fn_covered_enum(Covered::Variant2);","class":"lineCov","hits":"1","order":"72",},
{"lineNum":"  187","line":"    }","class":"lineCov","hits":"1","order":"50",},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"    #[test]"},
{"lineNum":"  190","line":"    fn partially_cover_enum() {","class":"lineCov","hits":"1","order":"55",},
{"lineNum":"  191","line":"        fn_partially_covered_enum(PartiallyCovered::Variant1);","class":"lineCov","hits":"1","order":"73",},
{"lineNum":"  192","line":"    }","class":"lineCov","hits":"1","order":"44",},
{"lineNum":"  193","line":""},
{"lineNum":"  194","line":"    #[test]"},
{"lineNum":"  195","line":"    fn cover_atrait_direct() {","class":"lineCov","hits":"1","order":"57",},
{"lineNum":"  196","line":"        let x = ATraitImplDirect;"},
{"lineNum":"  197","line":"        x.covered();","class":"lineCov","hits":"1","order":"76",},
{"lineNum":"  198","line":"        x.default_covered();","class":"lineCov","hits":"1","order":"77",},
{"lineNum":"  199","line":"        <ATraitImplDirect as ATrait>::func_covered();","class":"lineCov","hits":"1","order":"78",},
{"lineNum":"  200","line":"    }","class":"lineCov","hits":"1","order":"74",},
{"lineNum":"  201","line":"    #[test]"},
{"lineNum":"  202","line":"    fn cover_atrait_boxed() {","class":"lineCov","hits":"1","order":"60",},
{"lineNum":"  203","line":"        let x: Box<dyn BTrait> = Box::new(BTraitImplBoxed);","class":"lineCov","hits":"1","order":"80",},
{"lineNum":"  204","line":"        x.covered();","class":"lineCov","hits":"1","order":"81",},
{"lineNum":"  205","line":"        x.default_covered();","class":"lineCov","hits":"1","order":"83",},
{"lineNum":"  206","line":"    }","class":"lineCov","hits":"1","order":"62",},
{"lineNum":"  207","line":""},
{"lineNum":"  208","line":"    #[test]"},
{"lineNum":"  209","line":"    fn cover_simple_rule() {","class":"lineCov","hits":"1","order":"65",},
{"lineNum":"  210","line":"        call_simple_rule();","class":"lineCov","hits":"1","order":"85",},
{"lineNum":"  211","line":"    }","class":"lineCov","hits":"1","order":"67",},
{"lineNum":"  212","line":""},
{"lineNum":"  213","line":"    #[test]"},
{"lineNum":"  214","line":"    fn cover_generic_atrait() {","class":"lineCov","hits":"1","order":"70",},
{"lineNum":"  215","line":"        let x = ATraitImplGeneric;"},
{"lineNum":"  216","line":"        call_generic_atrait(x);","class":"lineCov","hits":"1","order":"86",},
{"lineNum":"  217","line":"    }","class":"lineCov","hits":"1","order":"40",},
{"lineNum":"  218","line":""},
{"lineNum":"  219","line":"    #[test]"},
{"lineNum":"  220","line":"    fn cover_async_funcs() {","class":"lineCov","hits":"1","order":"39",},
{"lineNum":"  221","line":"        block_on(async {","class":"lineCov","hits":"1","order":"43",},
{"lineNum":"  222","line":"            async_func().await;","class":"lineCov","hits":"1","order":"36",},
{"lineNum":"  223","line":"            async_func_anon().await;","class":"lineCov","hits":"1","order":"34",},
{"lineNum":"  224","line":"        });","class":"lineCov","hits":"1","order":"56",},
{"lineNum":"  225","line":"    }","class":"lineCov","hits":"1","order":"37",},
{"lineNum":"  226","line":""},
{"lineNum":"  227","line":"    #[test]"},
{"lineNum":"  228","line":"    fn cover_async_trait() {","class":"lineCov","hits":"1","order":"30",},
{"lineNum":"  229","line":"        block_on(async {","class":"lineCov","hits":"1","order":"52",},
{"lineNum":"  230","line":"            let x: Box<dyn AsyncTrait> = Box::new(AsyncTraitImpl);","class":"lineCov","hits":"1","order":"28",},
{"lineNum":"  231","line":"            x.covered().await;","class":"lineCov","hits":"1","order":"58",},
{"lineNum":"  232","line":"        });","class":"lineCov","hits":"1","order":"26",},
{"lineNum":"  233","line":"    }","class":"lineCov","hits":"1","order":"31",},
{"lineNum":"  234","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "", "date" : "2021-04-07 21:22:39", "instrumented" : 126, "covered" : 96,};
var merged_data = [];
