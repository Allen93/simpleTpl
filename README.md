# simpleTpl

## 功能
一个简单的JavaScript解析器。  
用于转换模板字符串，链接数据

## Example
#### 数据：
    var person = {
      name: 'Allen',
      age: 22,
      title: 'Web Developer',
      sign: 'Thinking&Learning&Develop',
      tags: ['Front End', 'JavaScript', 'Travel', 'Rock']
	};

#### 模板：
    {{ if (person){ }}
        {{ for (var key in person) { }}
        <div style="margin-left:15px;">{{# key }}. {{# person[key] }}</div>
        {{ } }}
    {{ } }}
    
#### 使用方式
	var compiler = new Compiler(source);
	var result = compiler.link({
		person: person
	});
#### 编译结果
	<div style="margin-left:15px;">name. Allen</div>
	<div style="margin-left:15px;">age. 22</div>
	<div style="margin-left:15px;">title. Web Developer</div>        
    <div style="margin-left:15px;">sign.Thinking&Learning&Develop</div>            
    <div style="margin-left:15px;">tags. Front End,JavaScript,Travel,Rock</div>    