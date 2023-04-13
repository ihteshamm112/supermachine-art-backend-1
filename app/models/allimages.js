const {sql} = require("../config/db.config");
const allimages = function (Images) {
    this.userID = Images.userID;
    this.FolderID = Images.FolderID
    this.name = Images.name;
    this.FolderStatus = Images.FolderStatus;
    this.image = Images.image;
    this.seedID = Images.seedID;

};
allimages.AddImages = async (req, res) => {
    sql.query(`CREATE TABLE IF NOT EXISTS public.Images (
                id SERIAL NOT NULL,
                userID SERIAL NOT NULL ,
                FolderID SERIAL,
                name text,
                FolderStatus text,
                image text ,
                seedID text ,
                createdAt timestamp,
                updatedAt timestamp ,
                PRIMARY KEY (id))  ` , async (err, result) => {
        if (err) {
            res.json({
                message: "Try Again",
                status: false,
                err
            });
        } else {
            if (!req.body.name || req.body.name === '') {
                res.json({
                    message: "Please Enter name",
                    status: false,
                });
            } else if (!req.body.seedID) {
                res.json({
                    message: "Please Enter seedID",
                    status: false,
                });
            } else {
                let queryx = `SELECT
                "folder".status
              FROM "folder" where id=${req.body.FolderID}`;
                const results = await sql.query(queryx);
                const status = results.rows[0].status;
                const { userID, FolderID, name, FolderStatus, image,
                    seedID } = req.body;
                const query = `INSERT INTO "images"
                         (id, userID,FolderID, name , FolderStatus,image,seedID  ,createdAt ,updatedAt )
                                    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, 'NOW()','NOW()' ) RETURNING * `;
                const foundResult = await sql.query(query,
                    [userID, FolderID, name, status, image, seedID]);
                if (foundResult.rows.length > 0) {
                    if (err) {
                        res.json({
                            message: "Try Again",
                            freeTrailDays: false,
                            err
                        });
                    }
                    else {
                        res.json({
                            message: "Images Added Successfully!",
                            status: true,
                            result: foundResult.rows,
                        });
                    }
                } else {
                    res.json({
                        message: "Try Again",
                        status: false,
                        err
                    });
                }

            };
        }

    });
}

allimages.ViewUserAllImages = (req, res) => {
    sql.query(`SELECT * FROM "images" WHERE  userid = $1 ORDER BY createdat DESC `, [req.body.userID], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                message: "Try Again",
                freeTrailDays: false,
                err
            });
        } else {
            res.json({
                message: "Images Details",
                freeTrailDays: true,
                result: result.rows
            });
        }
    });
}
allimages.GetAllImagesInFolder = (req, res) => {
    sql.query(`SELECT * FROM "images" WHERE ( folderid = $1 AND userid = $2)`,
     [req.body.folderID, req.body.userID], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                message: "Try Again",
                status: false,
                err
            });
        } else {
            console.log(result.rows);
            res.json({
                message: "Images Details",
                status: true,
                result: result.rows
            });
        }
    });
}


allimages.DeleteImages = async (req, res) => {
	const data = await sql.query(`select * from "images" where id = $1`, [req.params.id]);
	if (data.rows.length === 1) {
		sql.query(`DELETE FROM "images" WHERE id = $1;`, [req.params.id], (err, result) => {
			if (err) {
				res.json({
					message: "Try Again",
					status: false,
					err
				});
			} else {
				res.json({
					message: " image Deleted Successfully!",
					status: true,
					result: data.rows,

				});
			}
		});
	} else {
		res.json({
			message: "Not Found",
			status: false,
		});
	}
}
module.exports = allimages;