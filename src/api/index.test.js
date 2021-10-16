const rewire = require("rewire")
const index = rewire("./index")
const getSavedVotes = index.__get__("getSavedVotes")
const getHiddenPosts = index.__get__("getHiddenPosts")
// @ponicode
describe("getSavedVotes", () => {
    test("0", () => {
        let callFunction = () => {
            getSavedVotes()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getHiddenPosts", () => {
    test("0", () => {
        let callFunction = () => {
            getHiddenPosts()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.postUpvote", () => {
    test("0", () => {
        let callFunction = () => {
            index.postUpvote("bc23a9d531064583ace8f67dad60f6bb", -100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.postUpvote("bc23a9d531064583ace8f67dad60f6bb", 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.postUpvote(9876, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.postUpvote("c466a48309794261b64a4f02cfcc3d64", 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.postUpvote(12345, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.postUpvote(undefined, Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.hidePost", () => {
    test("0", () => {
        let callFunction = () => {
            index.hidePost(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.hidePost("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.hidePost("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.hidePost(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.hidePost("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.hidePost(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.getPosts", () => {
    test("0", () => {
        let callFunction = () => {
            index.getPosts("XRP", 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.getPosts("GBP", 64)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.getPosts("USDT", 32)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.getPosts("GBP", 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.getPosts("BCH", 16)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.getPosts(undefined, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
