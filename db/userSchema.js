const schema = {
	validator: {
		$jsonSchema: {
			properties: {
				name: {
                    type: "string"
                },
                gender: {
                    type: "string"
                },
                age: {
                    type: "number"
                },
                image: {
                    type: "string"
                },
                occupation: {
                    type: "string"
                },
                location: {
                    type: "string"
                }
			}
		}
	}
}

module.exports = schema