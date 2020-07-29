const schema = {
	validator: {
		$jsonSchema: {
			properties: {
				userName: {
                    type: "string"
                },
                email: {
                    type: 'string'
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
                },
                password: {
                    type: "string"
                }
            },
            required: [
                "userName", "email", "password", "gender", "image", "age"
            ]
		}
	}
}

module.exports = schema