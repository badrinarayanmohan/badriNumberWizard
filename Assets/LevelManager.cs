using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelManager : MonoBehaviour
{
    public void LoadLevel(string name)
    {
        Debug.Log("Level load requested for : " + name);
        Application.LoadLevel(name);

    }
    public void QuitRequest()
    {
        Debug.Log("I WANNA QUIT!");
        Application.Quit();
    }

    public void ReturnLevel(string name)
    {
        Debug.Log("Level load requested for : " + name);
        Application.LoadLevel(name);

    }
}
