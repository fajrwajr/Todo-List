import React, { useState } from "react";
//include images into your bundle

//create your first component
const List = () => {
	const [inputValue, setInputValue] = useState("");
	const [inputList, setInputList] = useState(["Niessa", "Sandy", "Liela"]);

	const delItem = index => {
		setInputList(inputList.filter((result, i) => index != i));
	};

	function addItem(e) {
		if (e.keyCode == 13) {
			setInputValue(inputValue);
			const list = inputList.concat(inputValue);
			setInputList(list);
			console.log(inputList);
		}
	}

	return (
		<div className="text-center mt-5">
			<h1>ToDo List</h1>
			<input
				type="text"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyUp={addItem}
			/>
			<div className="text-center mt-5">
				{inputList.map((result, index) => (
					<>
						<li key={index}>
							{result}
							<button onClick={() => delItem(index)}>
								<i
									className="fa fa-times"
									aria-hidden="true"></i>
							</button>
						</li>
					</>
				))}
			</div>
		</div>
	);
};

export default List;
