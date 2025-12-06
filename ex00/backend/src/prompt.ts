export const prompt = {
  type: "object",
  properties: {
    places: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
			type: "string"
		  },
          countryFlag: {
			type: "string"
		  },
          description: {
			type: "string"

		  },
          location: {
            type: "object",
            properties: {
              lat: {
				type: "number"

			  },
              lng: {
				type: "number"

			  }
            },
            required: ["lat", "lng"]
          }
        },
        required: ["name", "countryFlag", "description", "location"]
      },
      minItems: 4,
      maxItems: 4
    }
  },
  required: ["places"]
};
