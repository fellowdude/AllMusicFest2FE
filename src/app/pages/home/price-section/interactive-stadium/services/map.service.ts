import { ElementRef, Inject, Injectable, NgZone } from "@angular/core";
import { BasicRenderServiceAbstract } from "./basic-render-service.abstract";
import { ActionManager, Animation, ArcRotateCamera, Color3, CubicEase, EasingFunction, ExecuteCodeAction, GlowLayer, HemisphericLight, Mesh, MeshBuilder, PointLight, Quaternion, Scene, SceneLoader, Space, StandardMaterial, Vector3 } from "@babylonjs/core";
import { DOCUMENT } from "@angular/common";

import * as LOADERS from "@babylonjs/loaders/OBJ"
import { StadiumPopupService } from "src/app/shared/services/layout/stadium-popup/stadium-popup.service";

const FPS = 60;


@Injectable({
  providedIn: 'root'
})
export class MapService extends BasicRenderServiceAbstract {

    constructor(readonly zone: NgZone, @Inject(DOCUMENT) readonly doc: Document, private stadiumPopupService: StadiumPopupService) {
        super(zone, document);
    }

    override createScene(canvas: ElementRef<HTMLCanvasElement>): Scene {
        if (this.scene) {
            this.scene.dispose();
        }

        super.createScene(canvas);

        this.light && this.light.dispose();
        this.light = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

        const gl = new GlowLayer("glow", this.scene, {
            mainTextureFixedSize: 1024,
            blurKernelSize: 128,
        });
        gl.intensity = 0.7;

        this.stadiumPopupService.popupDataChange.subscribe({
            next: (response) => {
                if(!response?.active) {

                    gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                        result.set(0, 0, 0, 0);
                    };

                    var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames0 = []
                    keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                    keyFrames0.push({
                        frame: 60,
                        value: new Vector3(0,0,0)
                    })
                    animation0.setKeys(keyFrames0)

                    var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames = []
                    keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                    keyFrames.push({
                        frame: 60,
                        value: new Vector3(50,40,0)
                    })
                    animation.setKeys(keyFrames)
                    this.camera.animations = [animation0, animation]
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                }
            }
        })
        
        /* BASE */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_base.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('base', this.scene);
                material.diffuseColor = new Color3(0.9, 0.9, 0.9);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), 3 * Math.PI / 2);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(-7,-1.95,0));
                mesh.scaling = new Vector3(1.1,10,1.1)
                mesh.parent = this.rootMesh;
                mesh.actionManager = new ActionManager(this.scene);
            }
        )

        /* OUTSIDE */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_gold.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('outside', this.scene);
                material.diffuseColor = new Color3(0.3, 0.3, 0.3);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), 3 * Math.PI / 2);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(-28,0,0));
                mesh.scaling = new Vector3(1.65,4,1.75)
                mesh.parent = this.rootMesh;
                mesh.actionManager = new ActionManager(this.scene);
            }
        )
        
        /* SCENERY */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_escenario.obj',
            this.scene,
            (newMeshes) => {
                console.log(newMeshes[0]);
                const material = new StandardMaterial('scenery', this.scene);
                material.diffuseColor = new Color3(0, 0, 0);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), Math.PI / 2);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(-21.6,2,0));
                mesh.scaling = new Vector3(1,2,1)
                mesh.parent = this.rootMesh;
            }
        )
        
        /* NORTE */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_gold.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('north', this.scene);
                material.diffuseColor = new Color3(1/255, 184/255, 128/255);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), Math.PI / 2);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(13,-1.5,0));
                mesh.scaling = new Vector3(1.65,1.15,1.75)
                mesh.parent = this.rootMesh;
                mesh.actionManager = new ActionManager(this.scene);
                mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                    () => {
                        this.stadiumPopupService.newModalData({
                            active: true,
                            description: {
                                ogPrice: 127,
                                price: 85,
                                capacity: 8500,
                                borderColor: 'b_11'
                            },
                            imageLink: '',
                            title: 'TRIBUNA NORTE (APDAYC)'
                        });

                        
                        gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                            if (material.name === "north") {
                              result.set(1/255, 184/255, 128/255, 0.1);
                            } else {
                              result.set(0, 0, 0, 0);
                            }
                        };

                        var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames0 = []
                        keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                        keyFrames0.push({
                            frame: 60,
                            value: new Vector3(0,0,0)
                        })
                        animation0.setKeys(keyFrames0)

                        var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames = []
                        keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                        keyFrames.push({
                            frame: 60,
                            value: new Vector3(45,15,0)
                        })
                        animation.setKeys(keyFrames)
                        this.camera.animations = [animation0, animation]
                        this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                    })
                );
            }
        )
        
        /* GOLD */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_gold.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('gold', this.scene);
                material.diffuseColor = new Color3(248/255, 199/255, 60/255);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), Math.PI / 2);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(8.75,-0.5,0));
                mesh.scaling = new Vector3(1,1,1)
                mesh.parent = this.rootMesh;
                mesh.actionManager = new ActionManager(this.scene);
                mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                    () => {
                        this.stadiumPopupService.newModalData({
                            active: true,
                            description: {
                                ogPrice: 297,
                                price: 199,
                                capacity: 7000,
                                borderColor: 'b_8'
                            },
                            imageLink: '',
                            title: 'ZONA GOLD'
                        });

                        gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                            if (material.name === "gold") {
                              result.set(248/255, 199/255, 60/255, 0.2);
                            } else {
                              result.set(0, 0, 0, 0);
                            }
                        };

                        var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames0 = []
                        keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                        keyFrames0.push({
                            frame: 60,
                            value: new Vector3(0,0,0)
                        })
                        animation0.setKeys(keyFrames0)


                        var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames = []
                        keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                        keyFrames.push({
                            frame: 60,
                            value: new Vector3(30,15,0)
                        })
                        animation.setKeys(keyFrames)
                        this.camera.animations = [animation0, animation]
                        this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                    })
                );
            }
        )
        
        /* PLATINUM */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_platinum.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('platinum', this.scene);
                material.diffuseColor = new Color3(0/255, 99/255, 156/255);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), Math.PI / 2);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(0.5,0,0));
                mesh.scaling = new Vector3(1,1,1)
                mesh.parent = this.rootMesh;
                mesh.actionManager = new ActionManager(this.scene);
                mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                    () => {
                        this.stadiumPopupService.newModalData({
                            active: true,
                            description: {
                                ogPrice: 445,
                                price: 298,
                                capacity: 7000,
                                borderColor: 'b_7'
                            },
                            imageLink: '',
                            title: 'ZONA PLATINUM'
                        });

                        gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                            if (material.name === "platinum") {
                              result.set(0/255, 99/255, 156/255, 0.1);
                            } else {
                              result.set(0, 0, 0, 0);
                            }
                        };

                        var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames0 = []
                        keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                        keyFrames0.push({
                            frame: 60,
                            value: new Vector3(-10,0,0)
                        })
                        animation0.setKeys(keyFrames0)

                        var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames = []
                        keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                        keyFrames.push({
                            frame: 60,
                            value: new Vector3(18,7,0)
                        })
                        animation.setKeys(keyFrames)
                        this.camera.animations = [animation0, animation]
                        this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                    })
                );
            }
        )
        
        /* DIAMOND */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_diamond.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('diamond', this.scene);
                material.diffuseColor = new Color3(255/255, 153/255, 81/255);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), Math.PI / 2);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(-11,0.5,0));
                mesh.scaling = new Vector3(1,1,1)
                mesh.parent = this.rootMesh;
                mesh.actionManager = new ActionManager(this.scene);
                mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                    () => {
                        this.stadiumPopupService.newModalData({
                            active: true,
                            description: {
                                ogPrice: 572,
                                price: 383,
                                capacity: 9500,
                                borderColor: 'b_6'
                            },
                            imageLink: '',
                            title: 'ZONA DIAMOND'
                        });

                        gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                            if (material.name === "diamond") {
                              result.set(0/255, 99/255, 156/255, 0.2);
                            } else {
                              result.set(0, 0, 0, 0);
                            }
                        };

                        var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames0 = []
                        keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                        keyFrames0.push({
                            frame: 60,
                            value: new Vector3(-10,5,0)
                        })
                        animation0.setKeys(keyFrames0)

                        var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames = []
                        keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                        keyFrames.push({
                            frame: 60,
                            value: new Vector3(10,10,0)
                        })
                        animation.setKeys(keyFrames)
                        this.camera.animations = [animation0, animation]
                        this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                    })
                );
            }
        )

        /* ULTRA BORDER */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_ultra.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('obj_surface', this.scene);
                material.diffuseColor = new Color3(0, 0, 0);
                const mesh = newMeshes[0];
                mesh.material = material;
                //mesh.showBoundingBox = true;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), -1 * Math.PI / 4);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(-19,3.5,0));
                mesh.scaling = new Vector3(7,7,7)
                mesh.parent = this.rootMesh;
            }
        )
        
        /* ULTRA */
        SceneLoader.ImportMesh(
            '',
            './assets/models/',
            'estadio_ultra.obj',
            this.scene,
            (newMeshes) => {
                const material = new StandardMaterial('ultra', this.scene);
                material.diffuseColor = new Color3(237/255, 1/255, 174/255);
                const mesh = newMeshes[0];
                //mesh.showBoundingBox = true;
                mesh.material = material;
                mesh.setPivotPoint(mesh.getBoundingInfo().boundingBox.center);
                mesh.rotate(new Vector3(0,1,0), -1 * Math.PI / 4);
                mesh.position = mesh.getBoundingInfo().boundingBox.center.multiply(new Vector3(-1,-1,-1)).add(new Vector3(-19,3.75,0));
                mesh.scaling = new Vector3(6,6,6)
                mesh.parent = this.rootMesh;
                mesh.actionManager = new ActionManager(this.scene);
                mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                    () => {
                        this.stadiumPopupService.newModalData({
                            active: true,
                            description: {
                                ogPrice: 1589,
                                price: 1064,
                                capacity: 100,
                                borderColor: 'b_1'
                            },
                            imageLink: '',
                            title: 'ULTRA EXPERIENCE'
                        });

                        gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                            if (material.name === "ultra") {
                              result.set(237/255, 1/255, 174/255, 0.3);
                            } else {
                              result.set(0, 0, 0, 0);
                            }
                        };

                        var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames0 = []
                        keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                        keyFrames0.push({
                            frame: 60,
                            value: new Vector3(-30,0,0)
                        })
                        animation0.setKeys(keyFrames0)

                        var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                        var keyFrames = []
                        keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                        keyFrames.push({
                            frame: 60,
                            value: new Vector3(0,10,0)
                        })
                        animation.setKeys(keyFrames)

                        this.camera.animations = [animation0, animation]
                        this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                    })
                );
            }
        );

        /* ULTRA CIRCLE */
        let ultraCircle = () => {
            const material5 = new StandardMaterial('obj_surface', this.scene);
            material5.diffuseColor = new Color3(0, 0, 0);
            const mesh5 = MeshBuilder.CreateCylinder('',{diameter: 2.25, height: 1.75});
            mesh5.material = material5;
            //mesh5.showBoundingBox = true;
            mesh5.position = new Vector3(-15.5,3.25,0);
            mesh5.parent = this.rootMesh;
        };
        ultraCircle();
        
        /* FRONT STAGE LEFT */
        let frontStageLeft = () => {
            const material = new StandardMaterial('front_stage_l', this.scene);
            material.diffuseColor = new Color3(254/255, 0/255, 0/255);
            const mesh = MeshBuilder.CreateBox('',{width: 10, height: 2, depth: 8});
            mesh.material = material;
            //mesh.showBoundingBox = true;
            mesh.position = new Vector3(-14,1.75,-4);
            mesh.parent = this.rootMesh;
            mesh.actionManager = new ActionManager(this.scene);
            mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                () => {
                    this.stadiumPopupService.newModalData({
                        active: true,
                        description: {
                            ogPrice: 867.2,
                            price: 567.2,
                            capacity: 600,
                            perPerson: true,
                            borderColor: 'b_4'
                        },
                        imageLink: '',
                        title: 'BOX FRONT STAGE'
                    });

                    gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                        if (material.name === "front_stage_l") {
                          result.set(255/255, 255/255, 255/255, 0.1);
                        } else {
                          result.set(0, 0, 0, 0);
                        }
                    };

                    var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames0 = []
                    keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                    keyFrames0.push({
                        frame: 60,
                        value: new Vector3(-20,0,0)
                    })
                    animation0.setKeys(keyFrames0)

                    var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames = []
                    keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                    keyFrames.push({
                        frame: 60,
                        value: new Vector3(0,10,-5)
                    })
                    animation.setKeys(keyFrames)

                    this.camera.animations = [animation0, animation]
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                })
            );
        }
        frontStageLeft();
        
        /* FRONT STAGE RIGHT */
        let frontStageRight = () => {
            const material2 = new StandardMaterial('front_stage_r', this.scene);
            material2.diffuseColor = new Color3(215/255, 1/255, 1/255);
            const mesh2 = MeshBuilder.CreateBox('',{width: 10, height: 2, depth: 8});
            mesh2.material = material2;
            //mesh2.showBoundingBox = true;
            mesh2.position = new Vector3(-14,1.75,4);
            mesh2.parent = this.rootMesh;
            mesh2.actionManager = new ActionManager(this.scene);
            mesh2.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                () => {
                    this.stadiumPopupService.newModalData({
                        active: true,
                        description: {
                            ogPrice: 867.2,
                            price: 567.2,
                            capacity: 600,
                            perPerson: true,
                            borderColor: 'b_5'
                        },
                        imageLink: '',
                        title: 'BOX FRONT STAGE'
                    });

                    gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                        if (material.name === "front_stage_r") {
                          result.set(255/255, 255/255, 255/255, 0.2);
                        } else {
                          result.set(0, 0, 0, 0);
                        }
                    };

                    var animation0 = new Animation("cameraSwoop", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames0 = []
                    keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                    keyFrames0.push({
                        frame: 60,
                        value: new Vector3(-20,0,0)
                    })
                    animation0.setKeys(keyFrames0)

                    var animation = new Animation("cameraSwoop", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames = []
                    keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                    keyFrames.push({
                        frame: 60,
                        value: new Vector3(0,10,5)
                    })
                    animation.setKeys(keyFrames)

                    this.camera.animations = [animation0, animation]
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                })
            );
        }
        frontStageRight();

        /* ROYAL LEFT */
        let royalLeft = () => {
            const material3 = new StandardMaterial('royal_l', this.scene);
            material3.diffuseColor = new Color3(113/255, 0/255, 254/255);
            const mesh3 = MeshBuilder.CreateBox('',{width: 6, height: 2, depth: 6});
            mesh3.material = material3;
            //mesh3.showBoundingBox = true;
            mesh3.position = new Vector3(-16,2.5,-3);
            mesh3.parent = this.rootMesh;
            mesh3.actionManager = new ActionManager(this.scene);
            mesh3.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                () => {
                    this.stadiumPopupService.newModalData({
                        active: true,
                        description: {
                            ogPrice: 1270.8,
                            price: 850.8,
                            capacity: 150,
                            perPerson: true,
                            borderColor: 'b_2'
                        },
                        imageLink: '',
                        title: 'BOX ROYAL'
                    });

                    gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                        if (material.name === "royal_l") {
                          result.set(255/255, 255/255, 255/255, 0.2);
                        } else {
                          result.set(0, 0, 0, 0);
                        }
                    };

                    var animation0 = new Animation("cameraSwoop2", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames0 = []
                    keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                    keyFrames0.push({
                        frame: 60,
                        value: new Vector3(-25,0,0)
                    })
                    animation0.setKeys(keyFrames0)

                    var animation = new Animation("cameraSwoop2", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames = []
                    keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                    keyFrames.push({
                        frame: 60,
                        value: new Vector3(0,10,-7)
                    })
                    animation.setKeys(keyFrames)
                    this.camera.animations = [animation0, animation]
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                })
            );
        }
        royalLeft();
        
        /* ROYAL RIGHT */
        let royalRight = () => {
            const material4 = new StandardMaterial('royal_r', this.scene);
            material4.diffuseColor = new Color3(71/255, 0/255, 154/255);
            const mesh4 = MeshBuilder.CreateBox('',{width: 6, height: 2, depth: 6});
            mesh4.material = material4;
            //mesh4.showBoundingBox = true;
            mesh4.position = new Vector3(-16,2.5,3);
            mesh4.parent = this.rootMesh;
            mesh4.actionManager = new ActionManager(this.scene);
            mesh4.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                () => {

                    this.stadiumPopupService.newModalData({
                        active: true,
                        description: {
                            ogPrice: 1270.8,
                            price: 850.8,
                            capacity: 150,
                            perPerson: true,
                            borderColor: 'b_3'
                        },
                        imageLink: '',
                        title: 'BOX ROYAL'
                    });

                    gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                        if (material.name === "royal_r") {
                          result.set(255/255, 255/255, 255/255, 0.2);
                        } else {
                          result.set(0, 0, 0, 0);
                        }
                    };

                    var animation0 = new Animation("cameraSwoop2", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames0 = []
                    keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                    keyFrames0.push({
                        frame: 60,
                        value: new Vector3(-25,0,0)
                    })
                    animation0.setKeys(keyFrames0)

                    var animation = new Animation("cameraSwoop2", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames = []
                    keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                    keyFrames.push({
                        frame: 60,
                        value: new Vector3(0,10,7)
                    })
                    animation.setKeys(keyFrames)
                    this.camera.animations = [animation0, animation]
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                })
            );
        }
        royalRight();
        
        /* LEFT SIDE */
        let zoneLeft = () => {
            const material6 = new StandardMaterial('zone_l', this.scene);
            material6.diffuseColor = new Color3(111/255, 42/255, 255/255);
            const mesh6 = MeshBuilder.CreateBox('',{width: 25, height: 1.5, depth: 9});
            mesh6.material = material6;
            //mesh6.showBoundingBox = true;
            mesh6.position = new Vector3(-8.5,-1,-15);
            mesh6.parent = this.rootMesh;
            mesh6.actionManager = new ActionManager(this.scene);
            mesh6.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                () => {

                    this.stadiumPopupService.newModalData({
                        active: true,
                        description: {
                            ogPrice: 381,
                            price: 255,
                            capacity: 6500,
                            perPerson: true,
                            borderColor: 'b_10'
                        },
                        imageLink: '',
                        title: 'TRIBUNA ORIENTE'
                    });

                    gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                        if (material.name === "zone_l") {
                          result.set(255/255, 255/255, 255/255, 0.2);
                        } else {
                          result.set(0, 0, 0, 0);
                        }
                    };

                    var animation0 = new Animation("cameraSwoop2", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames0 = []
                    keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                    keyFrames0.push({
                        frame: 60,
                        value: new Vector3(-20,0,0)
                    })
                    animation0.setKeys(keyFrames0)

                    var animation = new Animation("cameraSwoop2", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames = []
                    keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                    keyFrames.push({
                        frame: 60,
                        value: new Vector3(20,10,-20)
                    })
                    animation.setKeys(keyFrames)
                    this.camera.animations = [animation0, animation]
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                })
            );
        }
        zoneLeft();

        /* RIGHT SIDE */
        let zoneRight = () => {
            const material7 = new StandardMaterial('zone_r', this.scene);
            material7.diffuseColor = new Color3(0/255, 208/255, 255/255);
            const mesh7 = MeshBuilder.CreateBox('',{width: 25, height: 1.5, depth: 9});
            mesh7.material = material7;
            //mesh7.showBoundingBox = true;
            mesh7.position = new Vector3(-8.5,-1,15);
            mesh7.parent = this.rootMesh;
            mesh7.actionManager = new ActionManager(this.scene);
            mesh7.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger,
                () => {
                    this.stadiumPopupService.newModalData({
                        active: true,
                        description: {
                            ogPrice: 381,
                            price: 255,
                            capacity: 6500,
                            perPerson: true,
                            borderColor: 'b_9'
                        },
                        imageLink: '',
                        title: 'TRIBUNA OCCIDENTE'
                    });

                    gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                        if (material.name === "zone_r") {
                        result.set(255/255, 255/255, 255/255, 0.2);
                        } else {
                        result.set(0, 0, 0, 0);
                        }
                    };

                    var animation0 = new Animation("cameraSwoop2", "target", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames0 = []
                    keyFrames0.push({ frame: 0, value: this.camera.target.clone() })
                    keyFrames0.push({
                        frame: 60,
                        value: new Vector3(-20,0,0)
                    })
                    animation0.setKeys(keyFrames0)

                    var animation = new Animation("cameraSwoop2", "position", 30, Animation.ANIMATIONTYPE_VECTOR3)
                    var keyFrames = []
                    keyFrames.push({ frame: 0, value: this.camera.position.clone() })
                    keyFrames.push({
                        frame: 60,
                        value: new Vector3(20,10,20)
                    })
                    animation.setKeys(keyFrames)
                    this.camera.animations = [animation0, animation]
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                    this.scene.beginAnimation(this.camera, 0, 60, false, 1)
                })
            );
        }
        zoneRight();

        return this.scene;
    }

}   