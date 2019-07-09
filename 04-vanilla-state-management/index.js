async function bar() {
  return 'bar';
}

async function foo() {
  const result = await bar();
  console.log(result);
}

foo().then(() => console.log('done!'));
