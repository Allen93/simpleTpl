var person = {
    name: 'Allen',
    age: 22,
    title: 'Web Developer',
    sign: 'Thinking&Learning&Develop',
    tags: ['Front End', 'JavaScript', 'Travel', 'Rock']
};

var source = document.getElementById('test_tpl').innerHTML;
var compiler = new Compiler(source);
var result = compiler.link({
	person: person
});

document.getElementById('content_tpl').innerHTML = result;
console.log(result)